---
title: "DOMMatrixReadOnly: skewY() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dommatrixreadonly/skewy/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMMatrixReadOnly: skewY() method

The `skewY()` method of the `DOMMatrixReadOnly` interface returns a new `DOMMatrix` created by applying the specified skew transformation to the source matrix along its y-axis. The original matrix is not modified.

To mutate the matrix as you skew it along the y-axis, see `DOMMatrix.skewYSelf()`.

## Syntax

```js
skewY()
skewY(sY)
```

### Parameters

- `sY`
    A number; the angle, in degrees, by which to skew the matrix along the y-axis.

### Return value

A `DOMMatrix`.

## Examples

```js
const matrix = new DOMMatrix(); // create a matrix
console.log(matrix.toString()); // original value
// "matrix(1, 0, 0, 1, 0, 0)"

console.log(matrix.skewY(14).toString()); // skew along y-axis
// "matrix(1, -0.25, 0, 1, 0, 0)"

console.log(matrix.toString()); // original unchanged
// "matrix(1, 0, 0, 1, 0, 0)"
```

## See also

- `DOMMatrix.skewYSelf()`
- `DOMMatrixReadOnly.skewX()`
- CSS `transform` property and the `skew()`, `skewY()`, and `matrix()` functions
- CSS transforms module
- SVG `transform` attribute
- `CanvasRenderingContext2D` interface's `transform()` method
