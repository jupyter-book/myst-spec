`````{tabbed} Markup
````
H{subscript}`2`O
````
`````

`````{tabbed} AST
```yaml
type: root
children:
  - type: paragraph
    children:
      - type: text
        value: H
      - type: mystRole
        name: subscript
        value: '2'
        children:
          - type: subscript
            children:
              - type: text
                value: '2'
      - type: text
        value: O

```
`````

`````{tabbed} Render

H{subscript}`2`O

`````

