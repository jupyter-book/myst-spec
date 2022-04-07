`````{tabbed} Markup
````
see {numref}`my-table`

```{list-table}  Caption text
:name: my-table

*   - Head 1
*   - Row 1
```
````
`````

`````{tabbed} AST
```yaml
type: root
children:
  - type: paragraph
    children:
      - type: text
        value: 'see '
      - type: mystRole
        kind: numref
        value: my-table
        children:
          - type: crossReference
            kind: numref
            identifier: my-table
            label: my-table
  - type: mystDirective
    kind: list-table
    args: Caption text
    options:
      name: my-table
    value: |-
      *   - Head 1
      *   - Row 1
    children:
      - type: container
        kind: table
        identifier: my-table
        label: my-table
        numbered: true
        children:
          - type: caption
            children:
              - type: paragraph
                children:
                  - type: text
                    value: Caption text
          - type: table
            children:
              - type: tableRow
                children:
                  - type: tableCell
                    children:
                      - type: text
                        value: Head 1
              - type: tableRow
                children:
                  - type: tableCell
                    children:
                      - type: text
                        value: Row 1

```
`````

`````{tabbed} Render

see {numref}`my-table`

```{list-table}  Caption text
:name: my-table

*   - Head 1
*   - Row 1
```

`````

