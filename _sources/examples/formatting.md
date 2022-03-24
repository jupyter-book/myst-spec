`````{tabbed} Markup
````
**strong**, _emphasis_, `literal text`, \*escaped symbols\*
````
`````

`````{tabbed} AST
```yaml
type: root
children:
  - type: paragraph
    children:
      - type: strong
        children:
          - type: text
            value: strong
      - type: text
        value: ', '
      - type: emphasis
        children:
          - type: text
            value: emphasis
      - type: text
        value: ', '
      - type: inlineCode
        value: literal text
      - type: text
        value: ', *escaped symbols*'

```
`````

`````{tabbed} Render

**strong**, _emphasis_, `literal text`, \*escaped symbols\*

`````

