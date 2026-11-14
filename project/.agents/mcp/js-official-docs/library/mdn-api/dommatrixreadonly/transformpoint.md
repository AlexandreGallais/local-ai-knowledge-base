---
title: "DOMMatrixReadOnly: transformPoint() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dommatrixreadonly/transformpoint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMMatrixReadOnly: transformPoint() method

The **`transformPoint`** method of the
`DOMMatrixReadOnly` interface creates a new `DOMPoint` object, transforming a specified point by the matrix. Neither the matrix nor the original point are altered.

You can also create a new `DOMPoint` by applying a matrix to a point with the `DOMPointReadOnly.matrixTransform()` method.

## Syntax

```js
transformPoint()
transformPoint(point)
```

### Parameters

- `point`
    A `DOMPoint` or `DOMPointReadOnly` instance, or an object containing up to four of the following properties:
    - `x`
        The `x`-coordinate of the point in space as a number. The default value is `0`.
    - `y`
        The `y`-coordinate of the point in space as a number. The default value is `0`.
    - `z`
        The `z`-coordinate, or depth coordinate, of the point in space as a number. The default value is `0`.; positive values are closer to the user and negative values retreat back into the screen.
    - `w`
        The `w` perspective value of the point, as a number. The default is `1`.

### Return value

A `DOMPoint`.

## Examples

### 2D transform

```js
const matrix = new DOMMatrixReadOnly();
const point = new DOMPointReadOnly(10, 20); // DOMPointReadOnly {x: 10, y: 20, z: 0, w: 1}
let newPoint = matrix.transformPoint(point); // DOMPoint {x: 10, y: 20, z: 0, w: 1}
```

### 3D transform

In this example, we apply a 3D point to a 3D matrix:

```js
// Matrix with translate(22, 37, 10) applied
const matrix3D = new DOMMatrixReadOnly([
  1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 22, 37, 10, 1,
]);
const point3D = new DOMPointReadOnly(5, 10, 3); // DOMPointReadOnly {x: 5, y: 10, z: 3, w: 1}
const transformedPoint3D = point3D.matrixTransform(matrix3D); // DOMPoint {x: 27, y: 47, z: 13, w: 1}
```

## See also

- `DOMPointReadOnly.matrixTransform()`
- CSS `matrix()` and `matrix3d()` functions
