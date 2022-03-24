`````{tabbed} Markup
````
+++
# Heading!
+++
````
`````

`````{tabbed} AST
```yaml
type: root
children:
  - type: blockBreak
  - type: heading
    depth: 1
    children:
      - type: text
        value: Heading!
  - type: blockBreak

```
`````

`````{tabbed} Render

+++
# Heading!
+++

`````

