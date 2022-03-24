`````{tabbed} Markup
````
This is genius {math}`e=mc^2`
````
`````

`````{tabbed} AST
```yaml
type: root
children:
  - type: paragraph
    children:
      - type: text
        value: 'This is genius '
      - type: role
        kind: math
        value: e=mc^2
        children:
          - type: inlineMath
            value: e=mc^2

```
`````

`````{tabbed} Render

This is genius {math}`e=mc^2`

`````

