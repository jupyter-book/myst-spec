import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { compile } from 'json-schema-to-typescript';

function loadSchema(filename: string) {
  return JSON.parse(readFileSync(filename, 'utf-8'));
}

function additionalPropsFalse(schema: Record<string, any>) {
  // json-schema-to-typescript will put an additional `[k: string]: any` property
  // on every object if additionalProperties is not explicitly `false`.
  // Therefore, we iterate through all the definitions and add this flag everywhere.
  // Doing this on the original json-schema types would be way too strict,
  // but here it works nicely.
  for (const key in schema?.$defs) {
    schema.$defs[key].additionalProperties = false;
    for (const item of schema.$defs[key].allOf || []) {
      item.additionalProperties = false;
    }
  }
}

function flattenRefs(schema: Record<string, any>) {
  // If we want a typescript type for every myst node type we must move them all
  // to a single json document. Otherwise, json-schema-to-typescript will resolve
  // the references without creating a new type. This simply removes the
  // file references once the schema is already combined into one schema document.
  return JSON.parse(
    JSON.stringify(schema).replace(/"[a-z]+.schema.json#\//g, '"#/')
  );
}

function allOfForEverything(schema: Record<string, any>) {
  // Ensures all $defs use "allOf" for their properties, even if it is unnecessary
  for (const key in schema.$defs) {
    if (!schema.$defs[key].allOf && schema.$defs[key].properties) {
      schema.$defs[key].allOf = [
        {
          properties: schema.$defs[key].properties || undefined,
          required: schema.$defs[key].required || undefined,
        },
      ];
      delete schema.$defs[key].properties;
      delete schema.$defs[key].required;
    }
  }
}

const myst = loadSchema(join(__dirname, 'schema', 'myst.schema.json'));

const subschemas = [
  'unist',
  'abbreviations',
  'admonitions',
  'blocks',
  'comments',
  'commonmark',
  'containers',
  'directives',
  'footnotes',
  'math',
  'references',
  'roles',
  'styles',
  'tables',
];
// Combine all schema files into the single myst schema document
subschemas.forEach(
  (subschema) =>
    (myst.$defs = {
      ...myst.$defs,
      ...loadSchema(join(__dirname, 'schema', `${subschema}.schema.json`))
        .$defs,
    })
);

type PropertyDefinition = {
  description?: string;
  type?: 'string' | 'number' | 'array' | 'object';
  value?: string | string[];
  from?: string;
};

type PropertyInfo = {
  properties: Record<string, PropertyDefinition>;
  required: string[];
};

function typeFromRef(ref?: string): string {
  return ref ? ref.split('/')[ref.split('/').length - 1] : '';
}

function mdReferenceFromRef(ref?: string): string {
  return `[${typeFromRef(ref)}]()`;
}

function definitionsFromProps(
  props,
  from?: string
): Record<string, PropertyDefinition> {
  const defs: Record<string, PropertyDefinition> = {};
  Object.keys(props).forEach((key) => {
    if (Object.keys(props[key]).length === 0) return defs;
    const def: PropertyDefinition = {
      description: props[key].description,
      type: props[key].type,
      from,
    };
    if (props[key].$ref) {
      def.type = 'object';
      def.value = mdReferenceFromRef(props[key].$ref);
    } else if (props[key].type === 'object') {
      def.type = 'object';
    } else if (props[key].const) {
      def.type = 'string';
      def.value = props[key].const;
    } else if (props[key].type === 'array') {
      def.type = 'array';
      if (props[key].items.type) {
        def.value = props[key].items.type;
      } else if (props[key].items.$ref) {
        def.value = mdReferenceFromRef(props[key].items.$ref);
      } else if (props[key].items.anyOf) {
        def.value = props[key].items.anyOf.map((a) =>
          mdReferenceFromRef(a.$ref)
        );
      }
    } else if (props[key].anyOf) {
      if (props[key].anyOf[0].type === 'array') {
        def.type = 'array';
        def.value = props[key].anyOf.map((a) =>
          mdReferenceFromRef(a.items.$ref)
        );
      } else {
        def.type = 'object';
        def.value = props[key].anyOf.map((a) => mdReferenceFromRef(a.$ref));
      }
    }
    if (props[key].enum) {
      def.value = props[key].enum;
    }
    if (props[key]) {
      defs[key] = def;
    }
  });
  return defs;
}

function propsFromObject(schemaDefinitions, key, from?): PropertyInfo {
  let properties: Record<string, PropertyDefinition> = {};
  let required: string[] = [];
  schemaDefinitions[key].allOf.forEach((subschema) => {
    if (subschema.required) {
      required = required.concat(...subschema.required);
    }
    if (subschema.properties) {
      properties = {
        ...properties,
        // todo: this will overwrite richer property definitions if they exist in properties
        //       but we want this second to maintain the order
        ...definitionsFromProps(subschema.properties, from),
      };
    } else if (subschema.$ref) {
      const key = typeFromRef(subschema.$ref);
      const refProps = propsFromObject(schemaDefinitions, key, from || key);
      required = required.concat(...refProps.required);
      properties = {
        ...properties,
        ...refProps.properties,
      };
    } else if (subschema.anyOf) {
      properties = {
        ...properties,
        ...definitionsFromProps(subschema),
      };
    }
  });
  return { properties, required };
}

function schema2md(schema): string {
  let md = '';
  Object.keys(schema.$defs).forEach((key) => {
    md += `# ${key}\n\n`;
    if (schema.$defs[key].description) {
      md += `${schema.$defs[key].description}\n\n`;
    }
    if (schema.$defs[key].allOf) {
      const { properties, required } = propsFromObject(schema.$defs, key);
      for (const prop in properties) {
        md += `- __${prop}${required.includes(prop) ? '*' : ''}__`;
        if (
          properties[prop].type ||
          properties[prop].value ||
          properties[prop].description
        ) {
          md += ': ';
        }
        if (properties[prop].type) {
          md += `_${properties[prop].type}_ `;
        }
        if (properties[prop].value) {
          const val = properties[prop].value;
          md += `(${typeof val === 'object' ? val.join(' | ') : val}) `;
        }
        if (properties[prop].description) {
          md += `${properties[prop].description} `;
        }
        if (properties[prop].description) {
          md += `${properties[prop].description} `;
        }
        if (properties[prop].from) {
          md += `- See ${mdReferenceFromRef(properties[prop].from)}`;
        }
        md += '\n';
      }
    } else if (schema.$defs[key].anyOf) {
      md += 'Any of ';
      md += schema.$defs[key].anyOf
        .map((a) => mdReferenceFromRef(a.$ref))
        .join(' | ');
      md += '\n';
    }
    md += '\n';
  });
  return md;
}

async function generate() {
  if (!existsSync('dist')) mkdirSync('dist');
  const schema = flattenRefs(myst);
  writeFileSync(
    join('dist', 'myst.schema.json'),
    JSON.stringify(schema, null, 2)
  );
  allOfForEverything(schema);
  writeFileSync(join('dist', 'myst.schema.md'), schema2md(schema));
  additionalPropsFalse(schema);
  writeFileSync(join('dist', 'index.d.ts'), await compile(schema, 'Root'));
}

generate();
