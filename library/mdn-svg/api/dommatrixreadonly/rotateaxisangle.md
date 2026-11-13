---
title: "DOMMatrixReadOnly: rotateAxisAngle() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dommatrixreadonly/rotateaxisangle/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMMatrixReadOnly: rotateAxisAngle() method

The `rotateAxisAngle()` method of the `DOMMatrixReadOnly` interface returns a new `DOMMatrix` created by rotating the source matrix by the given vector and angle. The original matrix is not altered.

To mutate the matrix as you rotate it, see `DOMMatrix.rotateAxisAngleSelf()`.

## Syntax

```js
rotateAxisAngle()
rotateAxisAngle(rotX)
rotateAxisAngle(rotX, rotY)
rotateAxisAngle(rotX, rotY, rotZ)
rotateAxisAngle(rotX, rotY, rotZ, angle)
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

### Return value

A `DOMMatrix`.

## Examples

```js
const matrix = new DOMMatrix(); // create a matrix
console.log(matrix.rotateAxisAngle().toString()); // matrix(1, 0, 0, 1, 0, 0)
console.log(matrix.rotateAxisAngle(10, 20, 30).toString()); // matrix(1, 0, 0, 1, 0, 0)
console.log(matrix.rotateAxisAngle(10, 20, 30, 45).toString());
/* matrix3d(
    0.728, 0.609, -0.315, 0, 
    -0.525, 0.791, 0.315, 0, 
    0.441, -0.063, 0.895, 
    0, 0, 0, 0, 1) */
console.log(matrix.rotateAxisAngle(5, 5, 5, -45).toString());
/* matrix3d(
    0.805, -0.311, 0.506, 0, 
    0.506, 0.805, -0.311, 0, 
    -0.311, 0.506, 0.805, 0, 
    0, 0, 0, 1) */
console.log(matrix.toString()); // output: "matrix(1, 0, 0, 1, 0, 0)" (unchanged)
```

## See also

- `DOMMatrix.rotateAxisAngleSelf()`
- `DOMMatrixReadOnly.rotate()`
- `DOMMatrixReadOnly.rotateFromVector()`
- CSS `transform` property and `rotate3d()` function
- CSS `rotate` property
- CSS transforms module
- SVG `transform` attribute
- `CanvasRenderingContext2D` interface and `rotate()` method
