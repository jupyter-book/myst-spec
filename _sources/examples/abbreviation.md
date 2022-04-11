`````{tabbed} Markup
````
Well {abbr}`CSS (Cascading Style Sheets)` is cool?
````
`````

`````{tabbed} AST
```yaml
type: root
children:
  - type: paragraph
    children:
      - type: text
        value: 'Well '
      - type: mystRole
        name: abbr
        value: CSS (Cascading Style Sheets)
        children:
          - type: abbreviation
            title: Cascading Style Sheets
            children:
              - type: text
                value: CSS
      - type: text
        value: ' is cool?'

```
`````

`````{tabbed} Render

Well {abbr}`CSS (Cascading Style Sheets)` is cool?

`````

