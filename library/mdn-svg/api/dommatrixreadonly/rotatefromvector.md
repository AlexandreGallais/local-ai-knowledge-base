---
title: "DOMMatrixReadOnly: rotateFromVector() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dommatrixreadonly/rotatefromvector/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMMatrixReadOnly: rotateFromVector() method

The `rotateFromVector()` method of the `DOMMatrixReadOnly` interface is returns a new `DOMMatrix` created by rotating the source matrix by the angle between the specified vector and `(1, 0)`. The rotation angle is determined by the angle between the vector `(1,0)T` and `(x,y)T` in the clockwise direction, or `(+/-)arctan(y/x)`. If `x` and `y` are both `0`, the angle is specified as `0`. The original matrix is not altered.

To mutate the matrix as you rotate it by the angle between the specified vector and `(1, 0)`, see `DOMMatrix.rotateFromVectorSelf()`.

## Syntax

```js
rotateFromVector()
rotateFromVector(rotX)
rotateFromVector(rotX, rotY)
```

### Parameters

- `rotX` (optional)
    A number; the x-coordinate of the x,y vector that determines the rotation angle. If undefined, `0` is used.
- `rotY` (optional)
    A number; the y-coordinate of the x,y vector that determines the rotation angle. If undefined, `0` is used.

### Return value

A `DOMMatrix`.

## Examples

```js
const matrix = new DOMMatrix(); // create a matrix
console.log(matrix.toString()); // original value
// output: "matrix(1, 0, 0, 1, 0, 0)"

console.log(matrix.rotateFromVector().toString()); // defaults to `0`
// output: matrix(1, 0, 0, 1, 0, 0)

console.log(matrix.rotateFromVector(10, 20).toString());
// matrix(0.447, 0.894, -0.894, 0.447, 0, 0)

console.log(matrix.rotateFromVector(-5, 5).toString());
// matrix(-0.707, 0.707, -0.707, -0.707, 0, 0)

console.log(matrix.toString()); // matrix remains unchanged
// output: "matrix(1, 0, 0, 1, 0, 0)"
```

## See also

- `DOMMatrix.rotateFromVectorSelf()`
- `DOMMatrixReadOnly.rotate()`
- `DOMMatrixReadOnly.rotateAxisAngle()`
- CSS `transform` property and `rotate3d()` function
- CSS `rotate` property
- CSS transforms module
- SVG `transform` attribute
- `CanvasRenderingContext2D` interface and `rotate()` method
