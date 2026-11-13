---
title: "DOMMatrix: rotateAxisAngleSelf() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dommatrix/rotateaxisangleself/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMMatrix: rotateAxisAngleSelf() method

The `rotateAxisAngleSelf()` method of the `DOMMatrix` interface is a transformation method that rotates the source matrix by the given vector and angle, returning the altered matrix.

To rotate a matrix without mutating it, see `DOMMatrixReadOnly.rotateAxisAngle()`, which creates a new rotated matrix while leaving the original unchanged.

## Syntax

```js
rotateAxisAngleSelf()
rotateAxisAngleSelf(rotX)
rotateAxisAngleSelf(rotX, rotY)
rotateAxisAngleSelf(rotX, rotY, rotZ)
rotateAxisAngleSelf(rotX, rotY, rotZ, angle)
```

### Parameters

- `rotX`
    A number; the x-coordinate of the vector denoting the axis of rotation. If non-zero, `is2D` is false.
- `rotY` (optional)
    A number; the y-coordinate of the vector denoting the axis of rotation. If undefined, the `rotX` value is used. If non-zero, `is2D` is false.
- `rotZ` (optional)
    A number; the z-coordinate of the vector denoting the axis of rotation. If undefined, the `rotX` value is used.
- `angle` (optional)
    A number; the angle of the rotation around the axis vector, in degrees.

If `rotY` and `rotZ` are both missing, `rotZ` is set to the value of `rotX`, and both `rotX` and `rotY` are `0`.

### Return value

A `DOMMatrix`.

## Examples

```js
const matrix = new DOMMatrix(); // create a matrix
console.log(matrix.rotateAxisAngleSelf(10, 20, 30, 45).toString());
/* "matrix3d(
    0.728, 0.609, -0.315, 0, 
    -0.525, 0.791, 0.315, 0, 
    0.441, -0.063, 0.895, 
    0, 0, 0, 0, 1)" */
console.log(matrix.toString());
/* "matrix3d(
    0.728, 0.609, -0.315, 0, 
    -0.525, 0.791, 0.315, 0, 
    0.441, -0.063, 0.895, 0, 
    0, 0, 0, 1)" */
```

## See also

- `DOMMatrixReadOnly.rotateAxisAngle()`
- `DOMMatrix.rotateSelf()`
- `DOMMatrix.rotateFromVectorSelf()`
- CSS `transform` property and `rotate3d()` function
- CSS `rotate` property
- CSS transforms module
- SVG `transform` attribute
- `CanvasRenderingContext2D` interface and `rotate()` method
