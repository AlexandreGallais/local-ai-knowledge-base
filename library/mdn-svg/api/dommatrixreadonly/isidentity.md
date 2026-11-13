---
title: "DOMMatrixReadOnly: isIdentity property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dommatrixreadonly/isidentity/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMMatrixReadOnly: isIdentity property

The readonly **`isIdentity`** property of the `DOMMatrixReadOnly` interface is a Boolean whose value is `true` if the matrix is the identity matrix.

The identity matrix is one in which every value is `0` _except_ those on the main diagonal from top-left to bottom-right corner (in other words, where the offsets in each direction are equal).

## Value

A Boolean value.

## Examples

```js
// Initialize a 2D matrix
const matrix = new DOMMatrix(); // create a matrix
console.log(matrix.isIdentity); // output: true

// Apply a transform that has no effect
console.log(matrix.translate(0).isIdentity); // output: true

// Apply a transform with effect: this rotates the matrix by 30deg
console.log(matrix.rotate(30).isIdentity); // output: false
```

## See also

- `DOMMatrix` interface
- `CSSMatrixComponent` interface
- `CanvasRenderingContext2D` interface
- CSS `transform-function/matrix()` function
- CSS `transform` property
- CSS transforms module
- SVG `transform` attribute
