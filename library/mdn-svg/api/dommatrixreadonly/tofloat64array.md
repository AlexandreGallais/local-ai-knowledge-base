---
title: "DOMMatrixReadOnly: toFloat64Array() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dommatrixreadonly/tofloat64array/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMMatrixReadOnly: toFloat64Array() method

The **`toFloat64Array()`** method of the `DOMMatrixReadOnly` interface returns a new `Float64Array` containing all 16 elements (`m11`, `m12`, `m13`, `m14`, `m21`, `m22`, `m23`, `m24`, `m31`, `m32`, `m33`, `m34`, `m41`, `m42`, `m43`, `m44`) which comprise the matrix. The elements are stored into the array as double-precision floating-point numbers in column-major (colexographical access, or "colex") order. (In other words, down the first column from top to bottom, then the second column, and so forth.)

## Syntax

```js
toFloat64Array()
```

### Parameters

None.

### Return value

A `Float64Array`; an array of the matrix's 16 element values.

## Examples

```js
const matrix = new DOMMatrixReadOnly();
let float64 = matrix.translate(20, 30, 50).toFloat64Array();
console.log(float64); // Float64Array(16) [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 20, 30, 0, 1 ] ]
console.log(`m41: ${float64[12]}, m42: ${float64[13]}, m43: ${float64[14]}`); // m41: 20, m42: 30, M44: 40

float64 = matrix.rotate(30).toFloat64Array();
console.log(float64);
console.log(`m11: ${float64[0]}, m12: ${float64[1]}`); // m11: 0.8660254037844387, m12: 0.49999999999999994
```

## See also

- `DOMMatrixReadOnly.toFloat32Array()`
- `DOMMatrix.setMatrixValue()`
