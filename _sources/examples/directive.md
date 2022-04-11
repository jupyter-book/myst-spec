`````{tabbed} Markup
````
```{abc} foo bar
:a: one
:b: two

ABC directive
```
````
`````

`````{tabbed} AST
```yaml
type: root
children:
  - type: mystDirective
    name: abc
    args: foo bar
    value: |-
      :a: one
      :b: two

      ABC directive

```
`````

`````{tabbed} Render

```{abc} foo bar
:a: one
:b: two

ABC directive
```

`````

