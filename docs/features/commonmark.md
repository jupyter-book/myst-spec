# CommonMark

This page provides an overview of the types of block and inline markup features supported by CommonMark and MyST, with pointers to additional content of interest. For full details on all the nuance of these features, please look at the [CommonMark Spec documentation](https://spec.commonmark.org/).

MyST (Markedly Structured Text) was designed to make it easier to create publishable computational documents written with Markdown notation. It is a superset of [CommonMark Markdown](https://commonmark.org/) and draws heavy inspiration from [RMarkdown](https://rmarkdown.rstudio.com/) syntax. In addition to CommonMark, MyST also implements and extends [mdast](https://github.com/syntax-tree/mdast), which is a standard abstract syntax tree for Markdown. `mdast` is part of the [unifiedjs](https://unifiedjs.com) community and has [many utilities](https://unifiedjs.com/explore/keyword/mdast/) for exporting and transforming your content.

## Block Markup

### Headings

```{embed} spec:heading

```

```{embed} example:heading

```

```{seealso}
Reference headings by preceding headers with a `(label)=`. See [](./references.md)!
```

### Lists

```{embed} spec:list

```

```{embed} example:list

```

### Code

```{embed} spec:code

```

```{embed} example:code

```

```{seealso}
Create code-blocks with additional highlighting using the `code-block` directive. See more here!
```

% TODO: provide a link!
% TODO: myst: implement code-block

### Blockquotes

```{embed} spec:blockquote

```

```{embed} example:blockquote

```

### Thematic Break

```{embed} spec:break

```

```{embed} example:break

```

```{seealso}
Thematic breaks should not be confused with MyST [block syntax](./blocks.md),
which is used to structurally seperate content.
```

### Link Definitions

```{embed} spec:definition

```

```{seealso}
These can be used in [](#inline-links) and are similar to [](./references.md) in MyST.
This syntax is also similar to [](./footnotes.md).
```

### Paragraph

```{embed} spec:paragraph

```

```{embed} example:paragraph

```

### Valid HTML

```{embed} spec:html

```

```{embed} example:html

```

## Inline Markup

(inline-links)=

### Inline links

```{embed} spec:link

```

```{embed} example:link

```

```{seealso}
[](./references.md) provides other ways to reference inline content.
```

### Inline images

```{embed} spec:image

```

```{embed} example:image

```

```{seealso}
[](./figures.md) provides other ways to size, label, and caption images.
```

### Text formatting

#### Emphasis

```{embed} spec:emphasis

```

#### Strong

```{embed} spec:strong

```

#### Inline Code

```{embed} spec:inlinecode

```

```{embed} example:formatting

```

```{seealso}
[](./basic.md) provides other roles for subscript, superscript, abbeviations, and other text formating.
```
