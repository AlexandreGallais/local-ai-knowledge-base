---
title: "DOMMatrixReadOnly: multiply() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dommatrixreadonly/multiply/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMMatrixReadOnly: multiply() method

The **`multiply()`** method of the `DOMMatrixReadOnly` interface creates and returns a new matrix which is the dot product of the matrix and the `otherMatrix` parameter. If `otherMatrix` is omitted, the matrix is multiplied by a matrix in which every element is `0` _except_ the bottom-right corner and the element immediately above and to its left: `m33` and `m34`. These have the default value of `1`. The original matrix is not modified.

To mutate the matrix as you multiply it, see `DOMMatrix.multiplySelf()`.

## Syntax

```js
multiply()
multiply(otherMatrix)
```

### Parameters

- `otherMatrix` (optional)
    The `DOMMatrix` multiplier.

### Return value

A `DOMMatrix`.

## Examples

```js
const matrix = new DOMMatrixReadOnly().translate(13, 21);
const multipliedMatrix = matrix.multiply(matrix);
console.log(matrix.toString()); // output: matrix(1, 0, 0, 1, 13, 21)
console.log(multipliedMatrix.toString()); // output: matrix(1, 0, 0, 1, 26, 42)
```

## See also

- `DOMMatrix.multiplySelf()`
- `DOMMatrix.preMultiplySelf()`
- CSS `matrix()` function
- CSS `matrix3d()` function
