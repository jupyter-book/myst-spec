`````{tabbed} Markup
````
[Key]: https://example.com 'example title'
````
`````

`````{tabbed} AST
```yaml
type: root
children:
  - type: definition
    identifier: key
    label: Key
    url: https://example.com
    title: example title

```
`````

`````{tabbed} Render

[Key]: https://example.com 'example title'

`````

