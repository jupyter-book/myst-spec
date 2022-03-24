`````{tabbed} Markup
````
```{note} This is a title in myst
  and an example of a note admonition.
```
````
`````

`````{tabbed} AST
```yaml
type: root
children:
  - type: directive
    kind: note
    args: This is a title in myst
    value: and an example of a note admonition.
    children:
      - type: admonition
        kind: note
        children:
          - type: admonitionTitle
            children:
              - type: text
                value: This is a title in myst
          - type: paragraph
            children:
              - type: text
                value: and an example of a note admonition.

```
`````

`````{tabbed} Render

```{note} This is a title in myst
  and an example of a note admonition.
```

`````

