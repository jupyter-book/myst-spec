import type {
  BlockContentMap,
  Blockquote,
  Break,
  Code,
  Data,
  Definition,
  DefinitionContentMap,
  Delete,
  Emphasis,
  FootnoteDefinition,
  FootnoteReference,
  FrontmatterContentMap,
  Heading,
  Html,
  Image,
  ImageReference,
  InlineCode,
  Link,
  LinkReference,
  List,
  ListContentMap,
  ListItem,
  Literal,
  Paragraph,
  Parent,
  PhrasingContentMap,
  Root,
  RootContentMap,
  RowContentMap,
  Strong,
  Table,
  TableCell,
  TableContentMap,
  TableRow,
  Text,
  ThematicBreak,
  Yaml,
} from 'mdast';
import type { Role } from '../src/index';

// ## CommonMark parents

// @ts-expect-error: `url` is required.
const linkWithoutUrl: Link = {
  type: 'link',
  children: [],
  identifier: 'foo',
};

const paragraphWithRole: Paragraph = {
  type: 'paragraph',
  children: [{ type: 'mystRole', name: 'ref', value: '', children: [] }],
};

// ## Content map checks

// Tests

// Check that all keys of a map are assignable to their corresponding node’s
// `type` field.
//
// A previous version of the types used a few cases such as `inlinecode` for
// `inlineCode` and so on.
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
