`````{tabbed} Markup
````
4{superscript}`th` of July
````
`````

`````{tabbed} AST
```yaml
type: root
children:
  - type: paragraph
    children:
      - type: text
        value: '4'
      - type: mystRole
        name: superscript
        value: th
        children:
          - type: superscript
            children:
              - type: text
                value: th
      - type: text
        value: ' of July'

```
`````

`````{tabbed} Render

4{superscript}`th` of July

`````

