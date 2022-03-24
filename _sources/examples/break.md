`````{tabbed} Markup
````
thematic

---

break
````
`````

`````{tabbed} AST
```yaml
type: root
children:
  - type: paragraph
    children:
      - type: text
        value: thematic
  - type: thematicBreak
  - type: paragraph
    children:
      - type: text
        value: break

```
`````

`````{tabbed} Render

thematic

---

break

`````

