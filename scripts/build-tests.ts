import { globSync } from 'glob';
import { readFileSync, writeFileSync } from 'node:fs';
import { load } from 'js-yaml';

type TestFile = {
  cases: TestCase[];
};
type TestCase = {
  title: string;
  id?: string;
  description?: string;
  skip?: boolean;
  invalid?: boolean;
  mdast: Record<string, any>;
  myst?: string;
  html?: string;
};

const files = globSync('docs/examples/*.yml');
const cases = files
  .map((name) => readFileSync(name).toString())
  .map((data) => (load(data) as TestFile).cases)
  .flat() as TestCase[];

const formatID = (id: string | undefined) => (id ? `(${id})` : ``);
const makeIdentifier = (test: TestCase, idx: number) => {
  return `${test.title}_${test.id ?? ''}_${idx}`
    .replace(/\W/g, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase();
};
const testDefinitions = cases
  .filter((test) => !test.invalid && !test.skip && test.mdast && test.myst)
  .map(
    (test, idx) => `
// ${test.title} ${formatID(test.id)}													     
const ${makeIdentifier(test, idx)}: Root = (${JSON.stringify(test.mdast)});
`,
  );
const compiledDefinitions = testDefinitions.join('\n');
const compiledDocument = `

import type {
	Root, 
	BlockContentMap,
	DefinitionContentMap,
	FrontmatterContentMap,
	ListContentMap,
	PhrasingContentMap,
	RootContentMap,
	RowContentMap,
	TableContentMap,
 } from '../src/index';
// Assert that there are no incorrect keys.
// If there are, these is not assignable.


// ## Content map checks

// Tests
${compiledDefinitions}

// Check that all keys of a map are assignable to their corresponding node’s
// \`type\` field.
//
// A previous version of the types used a few cases such as \`inlinecode\` for
// \`inlineCode\` and so on.
//
// The content maps themselves are not used at runtime: they’re just groupings
// of types.
// However that inconsistency prevented them from being used for things like
// defining rendering/handling functions keyed on the node type names.
type TypeMapIssues<M extends {}> = {
  [K in keyof M as M[K] extends { type: K } ? never : K]: [K, M[K]];
};

// Assert that there are no incorrect keys.
// If there are, these is not assignable.
const blockContent: TypeMapIssues<BlockContentMap> = {};
const definitionContent: TypeMapIssues<DefinitionContentMap> = {};
const frontmatterContent: TypeMapIssues<FrontmatterContentMap> = {};
const listContent: TypeMapIssues<ListContentMap> = {};
const phrasingContent: TypeMapIssues<PhrasingContentMap> = {};
const rootContent: TypeMapIssues<RootContentMap> = {};
const rowContent: TypeMapIssues<RowContentMap> = {};
const tableContent: TypeMapIssues<TableContentMap> = {};

`;
writeFileSync('test/compiled.ts', compiledDocument);
