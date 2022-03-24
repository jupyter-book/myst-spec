`````{tabbed} Markup
````
```python
print('this is python')
```
````
`````

`````{tabbed} AST
```yaml
type: root
children:
  - type: code
    lang: python
    value: print('this is python')

```
`````

`````{tabbed} Render

```python
print('this is python')
```

`````

