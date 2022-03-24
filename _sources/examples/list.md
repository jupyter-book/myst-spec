`````{tabbed} Markup
````
1. quotes
2. breaks
3. links
````
`````

`````{tabbed} AST
```yaml
type: root
children:
  - type: list
    ordered: true
    start: 1
    spread: false
    children:
      - type: listItem
        spread: false
        children:
          - type: text
            value: quotes
      - type: listItem
        spread: false
        children:
          - type: text
            value: breaks
      - type: listItem
        spread: false
        children:
          - type: text
            value: links

```
`````

`````{tabbed} Render

1. quotes
2. breaks
3. links

`````

