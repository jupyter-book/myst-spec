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
      - type: mystRole
        name: abc
        value: ABC role

```
`````

`````{tabbed} Render

{abc}`ABC role`

`````

