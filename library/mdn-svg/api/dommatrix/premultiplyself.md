---
title: "DOMMatrix: preMultiplySelf() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dommatrix/premultiplyself/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMMatrix: preMultiplySelf() method

The **`preMultiplySelf()`** method of the `DOMMatrix` interface modifies the matrix by pre-multiplying it with the specified `DOMMatrix`. This is equivalent to the dot product `B⋅A`, where matrix `A` is the source matrix and `B` is the matrix given as an input to the method. If no matrix is specified as the multiplier, the matrix is multiplied by a matrix in which every element is `0` _except_ the bottom-right corner and the element immediately above and to its left: `m33` and `m34`. These have the default value of `1`.

## Syntax

```js
preMultiplySelf()
preMultiplySelf(otherMatrix)
```

### Parameters

- `otherMatrix` (optional)
    The `DOMMatrix` multiplier.

### Return value

Returns itself; a `DOMMatrix` updated to results of the applied multiplications.

## Examples

```js
const matrix = new DOMMatrix().translate(3, 22);
const otherMatrix = new DOMMatrix().translateSelf(15, 45);

console.log(matrix.toString()); // output: matrix(1, 0, 0, 1, 3, 22)
console.log(otherMatrix.toString()); // output: matrix(1, 0, 0, 1, 15, 45)

matrix.preMultiplySelf(otherMatrix);

console.log(matrix.toString()); // output: matrix(1, 0, 0, 1, 18, 67)
console.log(otherMatrix.toString()); // output: matrix(1, 0, 0, 1, 15, 45)
```

## See also

- `DOMMatrix.multiplySelf()`
- `DOMMatrixReadOnly.multiply()`
- CSS `matrix()` function
- CSS `matrix3d()` function
