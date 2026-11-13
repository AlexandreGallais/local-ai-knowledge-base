---
title: "DOMMatrix: DOMMatrix() constructor"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dommatrix/dommatrix/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMMatrix: DOMMatrix() constructor

The **`DOMMatrix()`** constructor creates a new `DOMMatrix` object which represents a 4x4 matrix, suitable for 2D and 3D operations.

## Syntax

```js
new DOMMatrix()
new DOMMatrix(initString)
new DOMMatrix(initArray)
```

### Parameters

- `initString` (optional)
    A string representing a 2D or 3D matrix in CSS `matrix()` or `matrix3d()` format.
- `initArray` (optional)
    An array containing either 6 or 16 numbers in column-major order. Other array lengths throw a `TypeError`.
    - A 6-element array is interpreted as the matrix components `[m11, m12, m21, m22, m41, m42]`, creating a 2D matrix.
    - A 16-element array is interpreted as the matrix components `[m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44]`, creating a 3D matrix.

    If this argument is omitted, an identity matrix is created, i.e., equivalent to `[1, 0, 0, 1, 0, 0]`.

    If this argument is provided as a `Float32Array` or `Float64Array`, consider using the more performant static methods `DOMMatrix.fromFloat32Array()` or `DOMMatrix.fromFloat64Array()` instead.

### Return value

A new `DOMMatrix` object.

### Exceptions

- `TypeError`
    Thrown if the argument is not a string or an array with a length other than 6 or 16.
- `SyntaxError`
    Thrown if the string argument is not in a valid CSS `matrix()` or `matrix3d()` format.

## Examples

This example creates a DOMMatrix to use as an argument for calling `DOMPointReadOnly.matrixTransform()`.

```js
const point = new DOMPoint(5, 4);
const scaleX = 2;
const scaleY = 3;
const translateX = 12;
const translateY = 8;
const angle = Math.PI / 2;
const matrix = new DOMMatrix([
  Math.cos(angle) * scaleX,
  Math.sin(angle) * scaleX,
  -Math.sin(angle) * scaleY,
  Math.cos(angle) * scaleY,
  translateX,
  translateY,
]);
const transformedPoint = point.matrixTransform(matrix);
```

## See also

- `DOMMatrix.fromFloat32Array()`
- `DOMMatrix.fromFloat64Array()`
- `DOMMatrix.fromMatrix()`
