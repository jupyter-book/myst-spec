# Node Type Index

(flowcontent)=
## FlowContent

Any of {ref}`paragraph` | {ref}`definition` | {ref}`heading` | {ref}`thematicbreak` | {ref}`blockquote` | {ref}`list` | {ref}`html` | {ref}`code` | {ref}`comment` | {ref}`target` | {ref}`directive` | {ref}`admonition` | {ref}`container` | {ref}`math` | {ref}`table` | {ref}`footnotedefinition`

(listcontent)=
## ListContent

Only {ref}`listitem`

(phrasingcontent)=
## PhrasingContent

Any of {ref}`staticphrasingcontent` | {ref}`emphasis` | {ref}`strong` | {ref}`link` | {ref}`linkreference` | {ref}`subscript` | {ref}`superscript` | {ref}`underline` | {ref}`abbreviation` | {ref}`crossreference` | {ref}`footnotereference`

(staticphrasingcontent)=
## StaticPhrasingContent

Any of {ref}`text` | {ref}`html` | {ref}`emphasisstatic` | {ref}`strongstatic` | {ref}`inlinecode` | {ref}`break` | {ref}`image` | {ref}`imagereference` | {ref}`role` | {ref}`subscriptstatic` | {ref}`superscriptstatic` | {ref}`underlinestatic` | {ref}`inlinemath`

(blockbreak)=
## BlockBreak

Top-level break in the myst document, breaking it into Blocks

- __type*__: _string_ ("blockBreak") - See {ref}`node`
- __meta__: _string_ - block break metadata; conventionally, a stringified JSON dictionary but may be any arbitrary string 
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(block)=
## Block

Top-level content blocks or cells the myst document, delimited by BlockBreaks

- __type*__: _string_ ("block") - See {ref}`node`
- __meta__: _string_ - block metadata from preceding break; conventionally, a stringified JSON dictionary but may be any arbitrary string 
- __children__: _array_ ({ref}`flowcontent` | {ref}`listcontent` | {ref}`phrasingcontent`) - Top-level children of myst document 
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(role)=
## Role

Custom in-line behavior

- __type*__: _string_ ("mystRole") - See {ref}`node`
- __kind*__: _string_ 
- __value__: _string_ - content of the directive 
- __children__: _array_ ({ref}`phrasingcontent`) - parsed role content 
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(directive)=
## Directive

Content block with predefined behavior

- __type*__: _string_ ("mystDirective") - See {ref}`node`
- __kind*__: _string_ 
- __args__: _string_ 
- __options__: _object_ 
- __value__: _string_ - body of the directive, excluding options 
- __children__: _array_ ({ref}`flowcontent` | {ref}`phrasingcontent`) - parsed directive content 
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(target)=
## Target

Target node - provides identifier/label for the following node

- __type*__: _string_ ("target") - See {ref}`node`
- __identifier*__: _string_ - See {ref}`optionalassociation`
- __label__: _string_ - See {ref}`optionalassociation`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(crossreference)=
## CrossReference

In-line reference to an associated node

- __type*__: _string_ ("crossReference") - See {ref}`node`
- __kind__: _string_ ("eq" | "numref" | "ref") 
- __children__: _array_ ({ref}`staticphrasingcontent`) 
- __identifier*__: _string_ - See {ref}`optionalassociation`
- __label__: _string_ - See {ref}`optionalassociation`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(abbreviation)=
## Abbreviation

Abbreviation node described by title

- __type*__: _string_ ("abbreviation") - See {ref}`node`
- __children*__: _array_ ({ref}`staticphrasingcontent`) - abbreviated value - See {ref}`parent`
- __title__: _string_ - advisory information for the abbreviation 
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(admonition)=
## Admonition

Admonition node for drawing attention to text, separate from the neighboring content

- __type*__: _string_ ("admonition") - See {ref}`node`
- __kind__: _string_ ("attention" | "caution" | "danger" | "error" | "hint" | "important" | "note" | "seealso" | "tip" | "warning") - kind of admonition, to determine styling 
- __class__: _string_ - admonition class info to override kind 
- __children__: _array_ ({ref}`admonitiontitle` | {ref}`flowcontent`) 
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(admonitiontitle)=
## AdmonitionTitle

Custom title for admonition, replaces kind as title

- __type*__: _string_ ("admonitionTitle") - See {ref}`node`
- __children*__: _array_ ({ref}`phrasingcontent`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(container)=
## Container

Top-level container node to provide association and numbering to child content

- __type*__: _string_ ("container") - See {ref}`node`
- __kind*__: _string_ ("figure" | "table") - kind of container contents 
- __class__: _string_ - any custom class information 
- __numbered__: _boolean_ - count this container for numbering based on kind, e.g. Figure 1 
- __children*__: _array_ ({ref}`caption` | {ref}`legend` | {ref}`image` | {ref}`table`) - See {ref}`parent`
- __identifier__: _string_ - See {ref}`optionalassociation`
- __label__: _string_ - See {ref}`optionalassociation`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(caption)=
## Caption

Caption for container content

- __type*__: _string_ ("caption") - See {ref}`node`
- __children*__: _array_ ({ref}`flowcontent`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(legend)=
## Legend

Legend for container content

- __type*__: _string_ ("legend") - See {ref}`node`
- __children*__: _array_ ({ref}`flowcontent`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(footnotereference)=
## FootnoteReference

Inilne reference to footnote

- __type*__: _string_ ("footnoteReference") - See {ref}`node`
- __identifier*__: _string_ - See {ref}`optionalassociation`
- __label__: _string_ - See {ref}`optionalassociation`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(footnotedefinition)=
## FootnoteDefinition

Rich footnote content associated with footnote reference

- __type*__: _string_ ("footnoteDefinition") - See {ref}`node`
- __children*__: _array_ ({ref}`flowcontent`) - See {ref}`parent`
- __identifier*__: _string_ - See {ref}`optionalassociation`
- __label__: _string_ - See {ref}`optionalassociation`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(math)=
## Math

Math node for presenting numbered equations

- __type*__: _string_ ("math") - See {ref}`node`
- __identifier__: _string_ - See {ref}`optionalassociation`
- __label__: _string_ - See {ref}`optionalassociation`
- __value*__: _string_ - See {ref}`literal`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(inlinemath)=
## InlineMath

Fragment of math, similar to InlineCode, using role {math}

- __type*__: _string_ ("inlineMath") - See {ref}`node`
- __value*__: _string_ - See {ref}`literal`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(table)=
## Table

Two-dimensional table data

- __type*__: _string_ ("table") - See {ref}`node`
- __align__: _string_ ("left" | "center" | "right") 
- __children*__: _array_ ({ref}`tablerow`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(tablerow)=
## TableRow

One row of table containing cells

- __type*__: _string_ ("tableRow") - See {ref}`node`
- __children*__: _array_ ({ref}`tablecell`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(tablecell)=
## TableCell

One cell of table

- __type*__: _string_ ("tableCell") - See {ref}`node`
- __header__: _boolean_ 
- __align__: _string_ ("left" | "center" | "right") - alignment of content within cell 
- __children*__: _array_ ({ref}`phrasingcontent`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(subscript)=
## Subscript

Subscript content, using role {subscript}

- __type*__: _string_ ("subscript") - See {ref}`node`
- __children*__: _array_ ({ref}`phrasingcontent`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(subscriptstatic)=
## SubscriptStatic

Subscript content, with static children; used when parent node requires static content

- __type*__: _string_ ("subscript") - See {ref}`node`
- __children*__: _array_ ({ref}`staticphrasingcontent`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(superscript)=
## Superscript

Superscript content, using role {superscript}

- __type*__: _string_ ("superscript") - See {ref}`node`
- __children*__: _array_ ({ref}`phrasingcontent`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(superscriptstatic)=
## SuperscriptStatic

Superscript content, with static children; used when parent node requires static content

- __type*__: _string_ ("superscript") - See {ref}`node`
- __children*__: _array_ ({ref}`staticphrasingcontent`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(underline)=
## Underline

Underline content, using role {underline}

- __type*__: _string_ ("underline") - See {ref}`node`
- __children*__: _array_ ({ref}`phrasingcontent`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(underlinestatic)=
## UnderlineStatic

Underline content, with static children; used when parent node requires static content

- __type*__: _string_ ("underline") - See {ref}`node`
- __children*__: _array_ ({ref}`staticphrasingcontent`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(comment)=
## Comment

Comment nodes for comments present in myst but ingnored upon render

- __type*__: _string_ ("comment") - See {ref}`node`
- __value*__: _string_ - See {ref}`literal`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(paragraph)=
## Paragraph

- __type*__: _string_ ("paragraph") - See {ref}`node`
- __children*__: _array_ ({ref}`phrasingcontent`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(heading)=
## Heading

- __type*__: _string_ ("heading") - See {ref}`node`
- __depth*__: _integer_ 
- __children*__: _array_ ({ref}`phrasingcontent`) - See {ref}`parent`
- __identifier__: _string_ - See {ref}`optionalassociation`
- __label__: _string_ - See {ref}`optionalassociation`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(thematicbreak)=
## ThematicBreak

- __type*__: _string_ ("thematicBreak") - See {ref}`node`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(blockquote)=
## Blockquote

- __type*__: _string_ ("blockquote") - See {ref}`node`
- __children*__: _array_ ({ref}`flowcontent`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(list)=
## List

- __type*__: _string_ ("list") - See {ref}`node`
- __ordered__: _boolean_ - Is item order important or not? 
- __start__: _integer_ - Starting number of ordered list 
- __spread__: _boolean_ - One or more children are separated with a blank line from others 
- __children*__: _array_ ({ref}`listcontent`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(listitem)=
## ListItem

- __type*__: _string_ ("listItem") - See {ref}`node`
- __spread__: _boolean_ - One or more children are separated with a blank line from others 
- __children*__: _array_ ({ref}`phrasingcontent` | {ref}`flowcontent`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(html)=
## HTML

Fragment of raw HTML - does not need to be valid or complete

- __type*__: _string_ ("html") - See {ref}`node`
- __value*__: _string_ - See {ref}`literal`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(code)=
## Code

Block of preformatted text

- __type*__: _string_ ("code") - See {ref}`node`
- __lang__: _string_ - language of the code 
- __meta__: _string_ - custom information relating to the node 
- __class__: _string_ - user-defined class for code block 
- __showLineNumbers__: _boolean_ 
- __startingLineNumber__: _integer_ 
- __emphasizeLines__: _array_ (integer) 
- __identifier__: _string_ - See {ref}`optionalassociation`
- __label__: _string_ - See {ref}`optionalassociation`
- __value*__: _string_ - See {ref}`literal`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(definition)=
## Definition

Reference to a url resource

- __type*__: _string_ ("definition") - See {ref}`node`
- __identifier*__: _string_ - See {ref}`optionalassociation`
- __label__: _string_ - See {ref}`optionalassociation`
- __url*__: _string_ - See {ref}`resource`
- __title__: _string_ - See {ref}`resource`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(text)=
## Text

- __type*__: _string_ ("text") - See {ref}`node`
- __value*__: _string_ - See {ref}`literal`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(emphasis)=
## Emphasis

Stressed, italicized content

- __type*__: _string_ ("emphasis") - See {ref}`node`
- __children*__: _array_ ({ref}`phrasingcontent`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(emphasisstatic)=
## EmphasisStatic

Stressed, italicized content, with static children; used when parent node requires static content

- __type*__: _string_ ("emphasis") - See {ref}`node`
- __children*__: _array_ ({ref}`staticphrasingcontent`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(strong)=
## Strong

Important, serious, urgent, bold content

- __type*__: _string_ ("strong") - See {ref}`node`
- __children*__: _array_ ({ref}`phrasingcontent`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(strongstatic)=
## StrongStatic

Important, serious, urgent, bold content, with static children; used when parent node requires static content

- __type*__: _string_ ("strong") - See {ref}`node`
- __children*__: _array_ ({ref}`staticphrasingcontent`) - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(inlinecode)=
## InlineCode

Fragment of code

- __type*__: _string_ ("inlineCode") - See {ref}`node`
- __value*__: _string_ - See {ref}`literal`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(break)=
## Break

Line break

- __type*__: _string_ ("break") - See {ref}`node`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(link)=
## Link

Hyperlink

- __type*__: _string_ ("link") - See {ref}`node`
- __children*__: _array_ ({ref}`staticphrasingcontent`) - See {ref}`parent`
- __url*__: _string_ - See {ref}`resource`
- __title__: _string_ - See {ref}`resource`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(image)=
## Image

Image hyperlink

- __type*__: _string_ ("image") - See {ref}`node`
- __class__: _string_ - user-defined class for image 
- __width__: _string_ - image width in pixels or percentage 
- __align__: _string_ ("left" | "center" | "right") 
- __url*__: _string_ - See {ref}`resource`
- __title__: _string_ - See {ref}`resource`
- __alt__: _string_ - See {ref}`alternative`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(linkreference)=
## LinkReference

Hyperlink through association

- __type*__: _string_ ("linkReference") - See {ref}`node`
- __children*__: _array_ ({ref}`staticphrasingcontent`) - See {ref}`parent`
- __referenceType*__: _string_ ("shortcut" | "collapsed" | "full") - See {ref}`reference`
- __identifier*__: _string_ - See {ref}`optionalassociation`
- __label__: _string_ - See {ref}`optionalassociation`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(imagereference)=
## ImageReference

Image through association

- __type*__: _string_ ("imageReference") - See {ref}`node`
- __referenceType*__: _string_ ("shortcut" | "collapsed" | "full") - See {ref}`reference`
- __identifier*__: _string_ - See {ref}`optionalassociation`
- __label__: _string_ - See {ref}`optionalassociation`
- __alt__: _string_ - See {ref}`alternative`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

(resource)=
## Resource

Reference to external resource

- __url*__: _string_ 
- __title__: _string_ - advisory information, e.g. for a tooltip 

(optionalassociation)=
## OptionalAssociation

Internal relation from one node to another; not required by node

- __identifier__: _string_ - identifier that may match another node; value is unparsed and must be normalized such that whitespace is collapsed to single space, initial/final space is trimmed, and case is folded 
- __label__: _string_ - node label; character escapes and references are parsed; may be normalized to a unique identifier 

(association)=
## Association

Internal relation from one node to another

- __identifier*__: _string_ - See {ref}`optionalassociation`
- __label__: _string_ - node label; character escapes and references are parsed; may be normalized to a unique identifier - See {ref}`optionalassociation`

(alternative)=
## Alternative

Alternative description of image

- __alt__: _string_ - field describing the image 

(reference)=
## Reference

Marker associated to another node

- __referenceType*__: _string_ ("shortcut" | "collapsed" | "full") - explicitness of the reference: shortcut - reference is implicit, identifier inferred; collapsed - refernce explicit, identifier inferred; full - reference explicit, identifier explicit 

(node)=
## Node

Base unist node

- __type*__: _string_ - identifier for node variant 
- __data__: _object_ - information associated by the ecosystem with the node; never specified by mdast 
- __position__: _object_ ({ref}`position`) - location of node in source file; must not be present for generated nodes 

(literal)=
## Literal

Basic node with required string value

- __value*__: _string_ 
- __type*__: _string_ - identifier for node variant - See {ref}`node`
- __data__: _object_ - information associated by the ecosystem with the node; never specified by mdast - See {ref}`node`
- __position__: _object_ ({ref}`position`) - location of node in source file; must not be present for generated nodes - See {ref}`node`

(parent)=
## Parent

Basic node with required node children

- __children*__: _array_ ({ref}`node`) 
- __type*__: _string_ - identifier for node variant - See {ref}`node`
- __data__: _object_ - information associated by the ecosystem with the node; never specified by mdast - See {ref}`node`
- __position__: _object_ ({ref}`position`) - location of node in source file; must not be present for generated nodes - See {ref}`node`

(point)=
## Point

One place in a source file

- __line*__: _integer_ - line in the source file, 1-indexed 
- __column*__: _integer_ - column in the source file, 1-indexed 
- __offset__: _integer_ - offset character in the source file, 0-indexed 

(position)=
## Position

Location of a node in a source file

- __start*__: _object_ ({ref}`point`) - place of first character of parsed source region 
- __end*__: _object_ ({ref}`point`) - place of first character after parsed source region, whether it exists or not 
- __indent__: _array_ (integer) - start column at each index in the source region, for elements that span multiple lines 

(root)=
## Root

Myst syntax tree built on existing mdast schemas

- __type*__: _string_ ("root") - See {ref}`node`
- __children*__: _array_ ({ref}`block` | {ref}`blockbreak` | {ref}`flowcontent`) - Top-level children of myst document - See {ref}`parent`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`

