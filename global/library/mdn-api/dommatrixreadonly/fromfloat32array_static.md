---
title: "DOMMatrixReadOnly: fromFloat32Array() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dommatrixreadonly/fromfloat32array_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMMatrixReadOnly: fromFloat32Array() static method

The **`fromFloat32Array()`** static method of the `DOMMatrixReadOnly` interface creates a new `DOMMatrixReadOnly` object given an array of single-precision (32-bit) floating-point values.

If the array has 6 values, the result is a 2D matrix; if the array has 16 values, the result is a 3D matrix. Otherwise, a `TypeError` exception is thrown.

## Syntax

```js
DOMMatrixReadOnly.fromFloat32Array(array)
```

### Parameters

- `array`
    A `Float32Array` with 6 or 16 elements in column-major order.

### Return value

A `DOMMatrixReadOnly` object.

### Exceptions

- `TypeError`
    Thrown if the length of the `array` parameter is not 6 or 16.

## Examples

### Creating a 2D matrix from a Float32Array

This example creates a 2D matrix from a 6-element `Float32Array`.

```js
const float32Array = new Float32Array([1, 0, 0, 1, 10, 20]);
const matrix2D = DOMMatrixReadOnly.fromFloat32Array(float32Array);

console.log(matrix2D.toString());
// Output: matrix(1, 0, 0, 1, 10, 20)

console.log(matrix2D.is2D);
// Output: true
```

### Creating a 3D matrix from a Float32Array

This example creates a 3D matrix from a 16-element `Float32Array`.

```js
const float32Array = new Float32Array([
  1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 20, 30, 1,
]);
const matrix3D = DOMMatrixReadOnly.fromFloat32Array(float32Array);

console.log(matrix3D.is2D);
// Output: false

console.log(matrix3D.m41, matrix3D.m42, matrix3D.m43);
// Output: 10 20 30
```

## See also

- `DOMMatrixReadOnly()`
- `DOMMatrixReadOnly.toFloat32Array()`
- `DOMMatrixReadOnly.toFloat64Array()`
- `DOMMatrixReadOnly.fromFloat64Array()`
- `DOMMatrixReadOnly.fromMatrix()`
