---
title: "DOMMatrixReadOnly: DOMMatrixReadOnly() constructor"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dommatrixreadonly/dommatrixreadonly/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMMatrixReadOnly: DOMMatrixReadOnly() constructor

The **`DOMMatrixReadOnly()`** constructor creates a new `DOMMatrixReadOnly` object which represents a 4x4 matrix, suitable for 2D and 3D operations.

## Syntax

```js
new DOMMatrixReadOnly()
new DOMMatrixReadOnly(initString)
new DOMMatrixReadOnly(initArray)
```

### Parameters

- `initString` (optional)
    A string representing a 2D or 3D matrix in CSS `matrix()` or `matrix3d()` format.
- `initArray` (optional)
    An array containing either 6 or 16 numbers in column-major order. Other array lengths throw a `TypeError`.
    - A 6-element array is interpreted as the matrix components `[m11, m12, m21, m22, m41, m42]`, creating a 2D matrix.
    - A 16-element array is interpreted as the matrix components `[m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44]`, creating a 3D matrix.

    If this argument is omitted, an identity matrix is created, i.e., equivalent to `[1, 0, 0, 1, 0, 0]`.

    If this argument is provided as a `Float32Array` or `Float64Array`, consider using the more performant static methods `DOMMatrixReadOnly.fromFloat32Array()` or `DOMMatrixReadOnly.fromFloat64Array()` instead.

### Return value

A new `DOMMatrixReadOnly` object.

### Exceptions

- `TypeError`
    Thrown if the argument is not a string or an array with a length other than 6 or 16.
- `SyntaxError`
    Thrown if the string argument is not in a valid CSS `matrix()` or `matrix3d()` format.

## Examples

### Creating a DOMMatrixReadOnly from a string

```js
const matrixFromString = new DOMMatrixReadOnly("matrix(1, 0, 0, 1, 10, 20)");
console.log(matrixFromString.toJSON());
// Output: {a: 1, b: 0, c: 0, d: 1, e: 10, f: 20}
```

### Creating a DOMMatrixReadOnly from an array

```js
const matrixFromArray = new DOMMatrixReadOnly([1, 0, 0, 1, 10, 20]);
console.log(matrixFromArray.toJSON());
// Output: {a: 1, b: 0, c: 0, d: 1, e: 10, f: 20}
```

## See also

- `DOMMatrixReadOnly.fromFloat32Array()`
- `DOMMatrixReadOnly.fromFloat64Array()`
- `DOMMatrixReadOnly.fromMatrix()`
