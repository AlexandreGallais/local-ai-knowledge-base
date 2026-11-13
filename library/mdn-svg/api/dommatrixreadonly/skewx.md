---
title: "DOMMatrixReadOnly: skewX() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dommatrixreadonly/skewx/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMMatrixReadOnly: skewX() method

The `skewX()` method of the `DOMMatrixReadOnly` interface returns a new `DOMMatrix` created by applying the specified skew transformation to the source matrix along its x-axis. The original matrix is not modified.

To mutate the matrix as you skew it along the x-axis, see `DOMMatrix.skewXSelf()`.

## Syntax

```js
skewX()
skewX(sX)
```

### Parameters

- `sX`
    A number; the angle, in degrees, by which to skew the matrix along the x-axis.

### Return value

A `DOMMatrix`.

## Examples

```js
const matrix = new DOMMatrix(); // create a matrix
console.log(matrix.toString()); // no transform applied
// "matrix(1, 0, 0, 1, 0, 0)"

console.log(matrix.skewX(14).toString());
// "matrix(1, 0, 0.25, 1, 0, 0)"

console.log(matrix.toString()); // original is unchanged
// "matrix(1, 0, 0, 1, 0, 0)"
```

## See also

- `DOMMatrixReadOnly.skewY()`
- `DOMMatrix.skewXSelf()`
- CSS `transform` property and the `skew()`, `skewX()`, and `matrix()` functions
- CSS transforms module
- SVG `transform` attribute
- `CanvasRenderingContext2D` interface's `transform()` method
