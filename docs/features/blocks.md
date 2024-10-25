# Blocks & Comments

## Block Breaks

`Blocks` provide a structural divison of the MyST document using `+++`. These correspond, for example, to separate cells in a Jupyter Notebook. There can be optional metadata associated with the block.


### Specification

```{embed} spec:blockbreak
```

### Example

```{embed} example:blockbreak
```

## Comments

You may add comments by putting the `%` character at the beginning of a line. This will prevent the line from being parsed into the output document.


### Specification

```{embed} spec:comment
```

### Example

```{embed} example:comment
```

````{important}
Since comments are a block-level entity, they will terminate the previous block. In practical terms, this means that the following lines will be broken up into two paragraphs, resulting in a new line between them:

```
a line
% a comment
another line
```

a line
% a comment!
another line
````
