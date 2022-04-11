Top-level container node to provide association and numbering to child content

- __type*__: _string_ ("container") - See {ref}`node`
- __kind*__: _string_ ("figure" | "table") - kind of container contents 
- __class__: _string_ - any custom class information 
- __enumerated__: _boolean_ - count this container for numbering based on kind, e.g. Figure 1a 
- __enumerator__: _string_ - resolved enumerated value for this container 
- __children*__: _array_ ({ref}`caption` | {ref}`legend` | {ref}`image` | {ref}`table`) - See {ref}`parent`
- __identifier__: _string_ - See {ref}`optionalassociation`
- __label__: _string_ - See {ref}`optionalassociation`
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`
