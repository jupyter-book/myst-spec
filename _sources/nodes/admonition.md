Admonition node for drawing attention to text, separate from the neighboring content

- __type*__: _string_ ("admonition") - See {ref}`node`
- __kind__: _string_ ("attention" | "caution" | "danger" | "error" | "hint" | "important" | "note" | "seealso" | "tip" | "warning") - kind of admonition, to determine styling 
- __class__: _string_ - admonition class info to override kind 
- __children__: _array_ ({ref}`admonitiontitle` | {ref}`flowcontent`) 
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`
