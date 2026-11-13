---
title: "CSSMatrixComponent: CSSMatrixComponent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssmatrixcomponent/cssmatrixcomponent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSMatrixComponent: CSSMatrixComponent() constructor

The **`CSSMatrixComponent()`** constructor creates a new `CSSMatrixComponent` object representing the `matrix()` and `matrix3d()` values of the individual `transform` property in CSS.

## Syntax

```js
new CSSMatrixComponent(matrix)
new CSSMatrixComponent(matrix, options)
```

### Parameters

- `matrix`
    A 2d or 3d matrix.
- `options` (optional)
    An object with the following property:
    - `is2D`
        A boolean indicating whether the constructed `CSSMatrixComponent` should be treated as a 2D matrix. If omitted, this defaults to the value of `matrix`'s own `is2D` property.

## Examples

To do
