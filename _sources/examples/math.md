`````{tabbed} Markup
````
```{math}
:label: matrix
Ax = b
```
````
`````

`````{tabbed} AST
```yaml
type: root
children:
  - type: mystDirective
    name: math
    options:
      label: matrix
    value: Ax = b
    children:
      - type: math
        identifier: matrix
        label: matrix
        value: Ax = b

```
`````

`````{tabbed} Render

```{math}
:label: matrix
Ax = b
```

`````

