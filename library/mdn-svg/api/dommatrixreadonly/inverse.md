---
title: "DOMMatrixReadOnly: inverse() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dommatrixreadonly/inverse/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMMatrixReadOnly: inverse() method

The **`inverse()`** method of the `DOMMatrixReadOnly` interface creates a new matrix which is the inverse of the original matrix. If the matrix cannot be inverted, the new matrix's components are all set to `NaN` and its `is2D` property is set to `false`. The original matrix is not changed.

To mutate the matrix as you invert it, see `DOMMatrix.invertSelf()`.

## Syntax

```js
inverse()
```

### Parameters

None.

### Return value

A `DOMMatrix`.

## Examples

```js
const matrix = new DOMMatrixReadOnly().rotate(30);
const invertedMatrix = matrix.inverse();
console.log(matrix.toString());
// output: matrix(0.866, 0.5, -0.5, 0.866, 0, 0)
console.log(invertedMatrix.toString());
// output: matrix(0.866, -0.5, 0.5, 0.866, 0, 0)
```

## See also

- `DOMMatrix.invertSelf()`
- `DOMMatrixReadOnly.flipX()`
- `DOMMatrixReadOnly.flipY()`
- CSS `matrix()` function
- CSS `matrix3d()` function
