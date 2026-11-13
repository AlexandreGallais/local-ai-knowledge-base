---
title: "DOMMatrix: multiplySelf() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dommatrix/multiplyself/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMMatrix: multiplySelf() method

The **`multiplySelf()`** method of the `DOMMatrix` interface multiplies a matrix by the `otherMatrix` parameter, computing the dot product of the original matrix and the specified matrix: `A⋅B`. If no matrix is specified as the multiplier, the matrix is multiplied by a matrix in which every element is `0` _except_ the bottom-right corner and the element immediately above and to its left: `m33` and `m34`. These have the default value of `1`.

To multiply a matrix without mutating it, see `DOMMatrixReadOnly.multiply()`.

## Syntax

```js
multiplySelf()
multiplySelf(otherMatrix)
```

### Parameters

- `otherMatrix` (optional)
    The `DOMMatrix` multiplier.

### Return value

Returns itself; the `DOMMatrix` updated to the results of the applied multiplications.

## Examples

```js
const matrix = new DOMMatrix().rotate(30);

console.log(matrix.toString());
// output: matrix(0.866, 0.5, -0.5, 0.866, 0, 0)

matrix.multiplySelf(matrix);

console.log(matrix.toString());
// output: matrix(0.5, 0.866, -0.866, 0.5, 0, 0) (a 60deg rotation)
```

## See also

- `DOMMatrixReadOnly.multiply()`
- `DOMMatrix.preMultiplySelf()`
- CSS `matrix()` function
- CSS `matrix3d()` function
