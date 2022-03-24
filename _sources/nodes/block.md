Top-level content blocks or cells the myst document, delimited by BlockBreaks

- __type*__: _string_ ("block") - See {ref}`node`
- __meta__: _string_ - block metadata from preceding break; conventionally, a stringified JSON dictionary but may be any arbitrary string 
- __children__: _array_ ({ref}`flowcontent` | {ref}`listcontent` | {ref}`phrasingcontent`) - Top-level children of myst document 
- __position__: _object_ ({ref}`position`) - See {ref}`node`
- __data__: _object_ - See {ref}`node`
