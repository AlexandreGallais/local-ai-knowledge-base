---
title: "DOMMatrix: invertSelf() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dommatrix/invertself/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMMatrix: invertSelf() method

The **`invertSelf()`** method of the `DOMMatrix` interface inverts the original matrix. If the matrix cannot be inverted, the new matrix's components are all set to `NaN` and its `is2D` property is set to `false`.

To invert a matrix without mutating it, see `DOMMatrixReadOnly.inverse()`

## Syntax

```js
invertSelf()
```

### Parameters

None.

### Return value

A `DOMMatrix`.

## Examples

In this example, we create a matrix with a rotation of 30deg. Then invert it, resulting in a rotation of -30deg.

```js
const matrix = new DOMMatrix().rotate(30);
console.log(matrix.toString());
// output: matrix(0.866, 0.5, -0.5, 0.866, 0, 0)
matrix.invertSelf();
console.log(matrix.toString());
// output: matrix(0.866, -0.5, 0.5, 0.866, 0, 0)
```

## See also

- `DOMMatrixReadOnly.inverse()`
- CSS `matrix()` function
- CSS `matrix3d()` function
