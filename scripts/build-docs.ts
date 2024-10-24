import { parseArgs } from 'node:util';
import { unified } from 'unified';
import remarkParse from 'remark-parse';

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

type BooleanTest<T> = (test: T) => boolean;

// High level control
function isEqual(value: string): BooleanTest<string> {
  return (other: string) => value === other;
}
function isNotInSet(values: string[]): BooleanTest<string> {
  const valueSet = new Set(values);
  return (other: string) => !valueSet.has(other);
}

const INTRINSIC_ATTRIBUTE_ORDER = [
  isEqual('type'),
  isEqual('children'),
  isEqual('value'),
  // Any attributes not in the given set are captured here
  isNotInSet(['position', 'data']),
  isEqual('data'),
  isEqual('position'),
];

/**
 * Return true if the given type should be exported
 *
 * @param type_ - type name
 */
function shouldExport(type_: string): boolean {
  return (
    // Don't export these specific tyeps'
    !['AlignType', 'Array'].includes(type_) &&
    // Don't export maps
    !type_.endsWith('Map') &&
    // Don't export content built from maps
    !type_.endsWith('Content') &&
    // Don't export frontmatter stuff
    !type_.startsWith('Yaml')
  );
}

/**
 * Return true if the given type should be inlined
 *
 * @param type_ - type name
 */
function shouldInline(type_: string): boolean {
  return !shouldExport(type_);
}

////////////////////////////////////////////////////////////
type Schema = Record<string, any>;

function loadSchema(filename: string): Schema {
  return JSON.parse(readFileSync(filename, 'utf-8'));
}

/**
 * Convert a type to a relative local URI identifier
 *
 * @param type_ - type name
 */
function typeToIdentifier(type_: string): string {
  return `spec:${type_.toLowerCase()}`;
}

/**
 * Identify the name of a given ref target
 *
 * @param type_ - type name
 */
function getRefName(ref: string): string | undefined {
  // Pull out the name
  const match = ref.match(/#\/(.*)$/);
  if (!match) {
    return undefined;
  }
  // Take only final name
  const fragment = match[1];
  const nameMatch = fragment.match(/\/(\w+)$/);
  return nameMatch?.[1];
}

/**
 * Convert a type to a relative local URI
 *
 * @param type_ - type name
 */
function typeToURI(type_: string) {
  return `#${typeToIdentifier(type_)}`;
}

type Node = Record<string, any>;

type ResolverType = (ref: string) => Schema;

/**
 * Return true if the given name is required by the given schema
 *
 * @param name - name of attribute
 * @param schema - schema to which attribute belongs
 */
function isRequired(name: string, schema: Schema) {
  return (schema.required ?? []).includes(name);
}

/**
 * Sort function for intrinsic mdast attributes
 *
 * @param left - left attribute name
 * @param right - right attribute name
 */
function intrinsicAttributeCmp(left: string, right: string) {
  for (const test of INTRINSIC_ATTRIBUTE_ORDER) {
    const leftTest = test(left);
    const rightTest = test(right);
    if (leftTest) {
      return -1;
    } else if (rightTest) {
      return +1;
    }
  }
  return 0;
}

/**
 * Simplify JSON schema to replace `type: array` with `anyOf`
 *
 * The two constructs are functionally identical.
 *
 * @param schema - type schema
 */
function simplifySchemaOnce(schema: Schema) {
  const result = structuredClone(schema);
  if (Array.isArray(result.type)) {
    result.anyOf = result.type.map((type_) => ({ type: type_ }));
    delete result.type;
  }
  return result;
}

/**
 * Render the AST node(s) corresponding to a schema type definition additional info
 *
 * This usually means the type of an array's content
 *
 * @param resolveRef - reference resolver
 * @param schema - type schema
 */
function renderAdditionalTypeChildren(
  resolveRef: ResolverType,
  schema: Schema,
): Node[] {
  schema = simplifySchemaOnce(schema);

  if (schema.$ref !== undefined) {
    const { name, schema: subschema } = resolveRef(schema.$ref);

    // Only inlined types can possibly have additional info
    if (shouldInline(name)) {
      return renderAdditionalTypeChildren(resolveRef, subschema);
    } else {
      return [];
    }
  } else if (schema.type === 'array') {
    return [
      { type: 'text', value: 'Array of ' },
      // Note, this cannot in turn contain an array
      ...renderTypeChildren(resolveRef, schema.items),
    ];
  }
  // No error branch -- renderTypeChildren should handle exhaustively
  else {
    return [];
  }
}
/**
 * Render the AST node(s) corresponding to a schema type definition
 *
 * @param resolveRef - reference resolver
 * @param schema - type schema
 */
function renderTypeChildren(resolveRef: ResolverType, schema: Schema): Node[] {
  schema = simplifySchemaOnce(schema);

  if (schema.$ref !== undefined) {
    const { name, schema: subschema } = resolveRef(schema.$ref);

    // If we should inline the ref, resolve it and render it
    if (shouldInline(name)) {
      return renderTypeChildren(resolveRef, subschema);
    }
    // Otherwise, create a link
    else {
      return [
        {
          type: 'link',
          url: typeToURI(name),
          children: [{ type: 'inlineCode', value: getRefName(schema.$ref) }],
        },
      ];
    }
  }
  // Const types
  else if (schema.const !== undefined) {
    return [
      {
        type: 'inlineCode',
        value: `'${schema.const}'`,
      },
    ];
  }
  // Array types
  else if (schema.type === 'array') {
    // Leave this to the additional info section!
    return [{ type: 'inlineCode', value: 'array' }];
  }
  // Union types
  else if (schema.anyOf !== undefined) {
    const optionNodes: Node[] = [];
    schema.anyOf.forEach((subschema: Schema) => {
      const nodes = renderTypeChildren(resolveRef, subschema);
      optionNodes.push(...nodes, { type: 'text', value: ' | ' });
    });
    optionNodes.pop();
    return optionNodes;
  }
  // Primitive named types
  else if (typeof schema.type === 'string') {
    return [
      {
        type: 'inlineCode',
        value: schema.type,
      },
    ];
  } else {
    throw new Error(JSON.stringify(schema));
  }
}

const LINK_PATTERN =
  /(?:\{@link\s*(\S*)\s*\|\s*(\S+)?\})|(?:\{@link\s*(\S*)\s*(\S+)?\})/;

/**
 * Render the AST of a TSDoc type description
 *
 * @param text - CommonMark-infused description
 */
function renderDescription(text: string): Node {
  const pattern = new RegExp(LINK_PATTERN.source, LINK_PATTERN.flags + 'g');
  const textWithLinks = text.replaceAll(pattern, (match, p1, p2, p3, p4) => {
    const url = p1 ?? p3;
    const label = p2 ?? p4;
    const urlHasScheme = /^https?:/.test(url);
    let linkURL: string;
    let linkLabel: string;

    if (urlHasScheme) {
      linkURL = url;
      linkLabel = label ?? '';
    } else if (shouldExport(url)) {
      linkURL = typeToURI(url);
      linkLabel = label ?? url;
    } else {
      // Return quoted text!
      return `\`${url}\``;
    }
    return `[${linkLabel}](${linkURL})`;
  });

  const processor = unified().use(remarkParse);
  const root = processor.parse(textWithLinks);

  // Create a div so that we don't consume the node budget for rich hover-previews
  return { type: 'div', children: root.children };
}

/**
 * Render the AST of the properties of an object type.
 *
 * @param resolveRef - reference resolver
 * @param name - name of type
 * @param schema - type schema
 */
function renderObjectProperties(
  resolveRef: ResolverType,
  name: string,
  schema: Schema,
): Node {
  if (schema.properties === undefined) {
    return {
      type: 'mystDirective',
      name: 'note',
      value: 'This interface does not define any fields.',
      children: [
        {
          type: 'admonition',
          kind: 'note',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: 'This interface does not define any fields.',
                },
              ],
            },
          ],
        },
      ],
    };
  }
  return {
    type: 'definitionList',
    children: Object.entries((schema.properties ?? {}) as Record<string, Schema>)
      .sort((left, right) => intrinsicAttributeCmp(left[0], right[0]))
      .sort((left, right) =>
        isRequired(left[0], schema) ? (isRequired(right[0], schema) ? +0 : -1) : +1,
      )
      .map(([propName, subschema]) => {
        return [
          {
            type: 'definitionTerm',
            children: [
              {
                type: 'strong',
                children: [
                  {
                    type: 'text',
                    value: propName,
                  },
                ],
              },
              {
                type: 'text',
                value: ': ',
              },
              ...renderTypeChildren(resolveRef, subschema),
              ...(isRequired(propName, schema)
                ? [{ type: 'text', value: ' (required)' }]
                : []),
            ],
          },
          {
            type: 'definitionDescription',
            children: [
              ...renderDescription(subschema.description ?? '').children,
              ...renderAdditionalTypeChildren(resolveRef, subschema),
            ],
          },
        ];
      })
      .flat(),
  };
}

/**
 * Render the AST of an object type.
 *
 * @param resolveRef - reference resolver
 * @param name - name of type
 * @param schema - type schema
 */
function renderObject(resolveRef: ResolverType, name: string, schema: Schema): Node {
  return {
    type: 'root',
    children: [
      { type: 'heading', depth: 1, children: [{ type: 'text', value: name }] },
      {
        type: 'mystTarget',
        label: typeToIdentifier(name),
      },
      {
        type: 'heading',
        depth: 2,
        children: [
          {
            type: 'text',
            value: `${name} Specification`,
          },
        ],
      },
      renderDescription(schema.description ?? ''),
      renderObjectProperties(resolveRef, name, schema),
      {
        type: 'heading',
        depth: 2,
        children: [
          {
            type: 'text',
            value: 'Examples',
          },
        ],
      },
    ],
  };
}

function createDocument(
  resolveRef: ResolverType,
  name: string,
  schema: Schema,
): Record<string, any> {
  const mdast = renderObject(resolveRef, name, schema);
  return {
    kind: 'Article',
    mdast,
  };
}

function createIndexData(schema: Schema): Node {
  const mdast = {
    type: 'root',
    children: [
      {
        type: 'list',
        ordered: false,
        spread: false,
        children: Object.keys(schema.definitions)
          .filter(shouldExport)
          .map((name) => {
            return {
              type: 'listItem',
              spread: true,
              children: [
                {
                  type: 'link',
                  url: typeToURI(name),
                  children: [],
                },
              ],
            };
          }),
      },
    ],
  };
  return {
    kind: 'Article',
    frontmatter: {
      title: 'MyST AST Index',
      content_includes_title: true,
    },
    mdast,
  };
}

///////////////////////// CLI
const {
  values: { src, dest },
} = parseArgs({
  options: {
    src: {
      type: 'string',
      short: 'i',
    },
    dest: {
      type: 'string',
      short: 'o',
    },
  },
});
if (src === undefined || dest === undefined) {
  process.exit(1);
}

if (!existsSync(dest)) mkdirSync(dest);
if (!existsSync(join(dest, 'nodes'))) mkdirSync(join(dest, 'nodes'));

// Assume we have a schema of the form
// {
//   "definitions": [
//     "Foo": {
//       "type": ...
//     }
//   ]
// }
// where all refs are trivial #/definitions/Foo
// and only the following types are present:
//   - primitive
//   - outer `anyOf`
//   - `const`
//   - `ref`
//   - array of primitive
//   - `array`
//   - `object`
const schema = loadSchema(src);

// Write index
writeFileSync(join(dest, 'nodes.myst.json'), JSON.stringify(createIndexData(schema)));

const resolveRef = (ref: string) => {
  if (!ref.startsWith(schema.$id)) {
    return undefined;
  }
  const [_, path] = ref.match(/.*?#\/(.*)/);
  const parts = path.split('/');
  const subschema = parts.reduce((acc, val) => acc[val], schema);
  return { schema: subschema, name: getRefName(ref) };
};

// Write entries
Object.entries(schema.definitions)
  .filter(([name, subschema]) => shouldExport(name))
  .forEach(([name, subschema]) => {
    writeFileSync(
      join(dest, 'nodes', `${name.toLowerCase()}.myst.json`),
      JSON.stringify(createDocument(resolveRef, name, subschema)),
    );
  });
