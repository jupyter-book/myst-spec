var data = {};
var position = {
    start: { line: 1, column: 1, offset: 0 },
    end: { line: 1, column: 2, offset: 1 },
};
// ## CommonMark voids
var break_ = {
    type: 'break',
    position: position,
    data: data,
};
var definition = {
    type: 'definition',
    identifier: 'mdast',
    url: 'https://github.com/syntax-tree/mdast',
    position: position,
    data: data,
};
// @ts-expect-error: `identifier` is required.
var definitionWithoutIdentifier = {
    type: 'definition',
    url: '',
};
// @ts-expect-error: `url` is required.
var definitionWithoutIdentifier = {
    type: 'definition',
    identifier: '',
};
var definitionWithTitle = {
    type: 'definition',
    identifier: '',
    url: '',
    title: '',
};
var definitionWithLabel = {
    type: 'definition',
    identifier: '',
    label: '',
    url: '',
};
var image = {
    type: 'image',
    url: 'https://github.com/syntax-tree/mdast',
    alt: 'image alternative',
    position: position,
    data: data,
};
// @ts-expect-error: `url` is required.
var imageWithoutUrl = {
    type: 'image',
};
var imageWithTitle = {
    type: 'image',
    url: '',
    title: '',
};
var imageReference = {
    type: 'imageReference',
    identifier: 'x',
    referenceType: 'full',
    alt: 'image alternative',
    position: position,
    data: data,
};
var thematicBreak = {
    type: 'thematicBreak',
    position: position,
    data: data,
};
// ## CommonMark literals
var literal = {
    type: 'whatever',
    value: 'value',
    position: position,
    data: data,
};
var code = {
    type: 'code',
    value: '',
    position: position,
    data: data,
};
var codeWithLang = {
    type: 'code',
    lang: 'js',
    value: '',
    position: position,
    data: data,
};
var codeWithLangAndMeta = {
    type: 'code',
    lang: 'js',
    meta: 'eval',
    value: '',
    position: position,
    data: data,
};
var html = {
    type: 'html',
    value: '',
    position: position,
    data: data,
};
var inlineCode = {
    type: 'inlineCode',
    value: '',
    position: position,
    data: data,
};
var text = {
    type: 'text',
    value: '',
    position: position,
    data: data,
};
// ## CommonMark parents
var parent = {
    type: 'whatever',
    children: [text],
    position: position,
    data: data,
};
var paragraph = {
    type: 'paragraph',
    children: [text],
    position: position,
    data: data,
};
var blockquote = {
    type: 'blockquote',
    children: [paragraph],
    position: position,
    data: data,
};
var emphasis = {
    type: 'emphasis',
    children: [text],
    position: position,
    data: data,
};
var heading = {
    type: 'heading',
    depth: 1,
    children: [text],
    position: position,
    data: data,
};
// @ts-expect-error: `depth` is required.
var headingWithoutDepth = {
    type: 'heading',
    children: [],
};
var link = {
    type: 'link',
    children: [text],
    url: 'https://example.com',
    position: position,
    data: data,
};
var linkReference = {
    type: 'linkReference',
    identifier: 'x',
    referenceType: 'full',
    children: [text],
    position: position,
    data: data,
};
// @ts-expect-error: `url` is required.
var linkWithoutUrl = {
    type: 'link',
    children: [],
};
var linkWithTitle = {
    type: 'link',
    children: [],
    url: 'https://example.com',
    title: '',
};
var listItem = {
    type: 'listItem',
    children: [paragraph],
    position: position,
    data: data,
};
var listItemWithChecked = {
    type: 'listItem',
    children: [],
    checked: true,
};
var listItemWithSpread = {
    type: 'listItem',
    children: [],
    spread: true,
};
var list = {
    type: 'list',
    children: [listItem],
    position: position,
    data: data,
};
var listWithOrdered = {
    type: 'list',
    children: [],
    ordered: true,
};
var root = {
    type: 'root',
    children: [],
    position: position,
    data: data,
};
var strong = {
    type: 'strong',
    children: [text],
    position: position,
    data: data,
};
// ## GFM
var delete_ = {
    type: 'delete',
    children: [text],
    position: position,
    data: data,
};
var footnoteDefinition = {
    type: 'footnoteDefinition',
    identifier: 'mdast',
    children: [paragraph],
    position: position,
    data: data,
};
var footnoteReference = {
    type: 'footnoteReference',
    identifier: 'mdast',
    position: position,
    data: data,
};
var tableCell = {
    type: 'tableCell',
    children: [text],
    position: position,
    data: data,
};
var tableRow = {
    type: 'tableRow',
    children: [tableCell],
    position: position,
    data: data,
};
var table = {
    type: 'table',
    children: [tableRow],
    position: position,
    data: data,
};
var tableWithAlign = {
    type: 'table',
    align: ['left', 'center', 'right'],
    children: [tableRow],
    position: position,
    data: data,
};
// ## Frontmatter
var yaml = {
    type: 'yaml',
    value: '',
    position: position,
    data: data,
};
var rootOther = {
    type: 'root',
    data: data,
    position: position,
    children: [{ type: 'toml', value: '' }],
};
var rootAnother = {
    type: 'root',
    data: data,
    position: position,
    children: [
        // @ts-expect-error: node not registered in `RootContentMap`.
        { type: 'invalid' },
    ],
};
var textWithData = {
    type: 'text',
    value: 'value',
    data: {
        someField: 'a',
        // @ts-expect-error: registered on inline codes, not on texts.
        someOtherField: 1,
    },
};
var textWithOtherData = {
    type: 'text',
    value: 'value',
    data: {
        someField: 'a',
        // @ts-expect-error: not registered.
        someUnknownField: true,
    },
};
var inlineCodeWithData = {
    type: 'inlineCode',
    value: 'value',
    data: {
        someField: 'a',
        someOtherField: 1,
        // @ts-expect-error: not registered.
        someUnknownField: true,
    },
};
// @ts-expect-error: `url` is required.
var linkWithoutUrl = {};
var paragraphWithRole = {
    type: 'paragraph',
    children: [{ type: 'mystRole', name: 'ref', value: '', children: [] }],
};
// Assert that there are no incorrect keys.
// If there are, these is not assignable.
var blockContent = {};
var definitionContent = {};
var frontmatterContent = {};
var listContent = {};
var phrasingContent = {};
var rootContent = {};
var rowContent = {};
var tableContent = {};
export {};
