`````{tabbed} Markup
````
```{figure} https://via.placeholder.com/150
This is the figure caption!

Something! A legend!?
```
````
`````

`````{tabbed} AST
```yaml
type: root
children:
  - type: mystDirective
    kind: figure
    args: https://via.placeholder.com/150
    value: |-
      This is the figure caption!

      Something! A legend!?
    children:
      - type: container
        kind: figure
        children:
          - type: image
            url: https://via.placeholder.com/150
          - type: caption
            children:
              - type: paragraph
                children:
                  - type: text
                    value: This is the figure caption!
          - type: legend
            children:
              - type: paragraph
                children:
                  - type: text
                    value: Something! A legend!?

```
`````

`````{tabbed} Render

```{figure} https://via.placeholder.com/150
This is the figure caption!

Something! A legend!?
```

`````

