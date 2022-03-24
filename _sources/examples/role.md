`````{tabbed} Markup
````
{abc}`ABC role`
````
`````

`````{tabbed} AST
```yaml
type: root
children:
  - type: paragraph
    children:
      - type: role
        kind: abc
        value: ABC role

```
`````

`````{tabbed} Render

{abc}`ABC role`

`````

