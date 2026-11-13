---
title: "DOMPointReadOnly: matrixTransform() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dompointreadonly/matrixtransform/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMPointReadOnly: matrixTransform() method

The **`matrixTransform()`** method of the `DOMPointReadOnly` interface applies a matrix transform specified as an object to the DOMPointReadOnly object, creating and returning a new `DOMPointReadOnly` object. Neither the matrix nor the point are altered.

If the matrix passed as a parameter is 2D (the `is2D` is `true`) then this is a 2D transformation and the point's `z` coordinate will be `0` and point's `w` perspective will be `1`. Otherwise this is a 3D transformation.

You can also create a new `DOMPoint` with a point and matrix with the `DOMMatrixReadOnly.transformPoint()` method.

## Syntax

```js
matrixTransform()
matrixTransform(matrix)
```

### Parameters

- `matrix`
    A `DOMMatrix` or `DOMMatrixReadOnly` object.

### Return value

A new `DOMPoint` object.

## Examples

### 2D transform

In this example, we apply a 2D matrix transform to a `DOMPointReadOnly`, creating a new `DOMPoint`:

```js
const originalPoint = new DOMPointReadOnly(10, 20); // DOMPointReadOnly {x: 10, y: 20, z: 0, w: 1}
const matrix = new DOMMatrix([1, 0, 0, 1, 15, 30]);

const transformedPoint = originalPoint.matrixTransform(matrix); // DOMPoint {x: 25, y: 50, z: 0, w: 1}

console.log(transformedPoint.toJSON()); // output: {x: 25, y: 50, z: 0, w: 1}
```

### 3D transform

In this example, we apply a 3D matrix transform to a `DOMPointReadOnly`:

```js
const point = new DOMPointReadOnly(5, 10); // DOMPointReadOnly {x: 5, y: 10, z: 0, w: 1}
const matrix3D = new DOMMatrix().translate(0, 0, 10);
const transformedPoint = point.matrixTransform(matrix3D); // DOMPoint {x: 5, y: 10, z: 10, w: 1}
```

## See also

- `DOMPoint`
- `DOMMatrix`
- `DOMMatrixReadOnly.transformPoint()`
- CSS `matrix()` and `matrix3d()` functions
