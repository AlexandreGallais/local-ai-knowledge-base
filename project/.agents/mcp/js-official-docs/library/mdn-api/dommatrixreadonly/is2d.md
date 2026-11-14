---
title: "DOMMatrixReadOnly: is2D property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dommatrixreadonly/is2d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMMatrixReadOnly: is2D property

The readonly **`is2D`** property of the `DOMMatrixReadOnly` interface is a Boolean flag that is `true` when the matrix is 2D. The value is `true` if the matrix was initialized as a 2D matrix and only 2D transformation operations were applied. Otherwise, the matrix is defined in 3D, and `is2D` is `false`.

## Value

A Boolean value.

## Examples

```js
// Initialize a 2D matrix
const matrix = new DOMMatrix(); // create a matrix
console.log(matrix.is2D); // output: true

// Transform in a 2D space
console.log(matrix.rotate(30).is2D); // output: true

// Apply a 3D transform
console.log(matrix.rotate(10, 20, 1).is2D); // output: false
```

## See also

- `CSSTransformValue.is2D`
- `CSSTransformComponent.is2D`
- CSS `transform-function` functions
- CSS `transform` property
- CSS transforms module
- SVG `transform` attribute
- `CanvasRenderingContext2D` interface
