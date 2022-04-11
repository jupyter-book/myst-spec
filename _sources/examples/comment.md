`````{tabbed} Markup
````
Something
% A comment
Something else
````
`````

`````{tabbed} AST
```yaml
type: root
children:
  - type: paragraph
    children:
      - type: text
        value: Something
  - type: mystComment
    value: A comment
  - type: paragraph
    children:
      - type: text
        value: Something else

```
`````

`````{tabbed} Render

Something
% A comment
Something else

`````

