# Commonmark mdast

A basic Markdown Abstract Syntax Tree, mdast, is defined at [](https://github.com/syntax-tree/mdast). That specification defines the syntax tree for all commonmark features, as well as several additional extensions. Myst mdast is an extension of this mdast, and any valid mdast following that definition will also be valid myst mdast.

## Deviations commonmark mdast

- The commonmark spec presents `+++` as an invalid thematic break in [example 44](https://spec.commonmark.org/0.30/#example-44). However, in Myst `+++` is a block break, a non-commonmark feature. Therefore we simply removed example 44 in our test cases.
