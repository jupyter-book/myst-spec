`````{tabbed} Markup
````
(my_ID)=
# My Header
````
`````

`````{tabbed} AST
```yaml
type: root
children:
  - type: target
    identifier: my_id
    label: my_ID
  - type: heading
    depth: 1
    children:
      - type: text
        value: My Header

```
`````

`````{tabbed} Render

(my_ID)=
# My Header

`````

