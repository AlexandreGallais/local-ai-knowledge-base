---
title: "DOMMatrixReadOnly: rotate() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dommatrixreadonly/rotate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMMatrixReadOnly: rotate() method

The `rotate()` method of the `DOMMatrixReadOnly` interface returns a new `DOMMatrix` created by rotating the source matrix around each of its axes by the specified number of degrees. The original matrix is not altered.

To mutate the matrix as you rotate it, see `DOMMatrix.rotateSelf()`.

## Syntax

```js
rotate()
rotate(rotX)
rotate(rotX, rotY)
rotate(rotX, rotY, rotZ)
```

### Parameters

- `rotX`
    A number; the x-coordinate of the vector denoting the axis of rotation. If non-zero, `is2D` is false.
- `rotY` (optional)
    A number; the y-coordinate of the vector denoting the axis of rotation. If non-zero, `is2D` is false.
- `rotZ` (optional)
    A number; the z-coordinate of the vector denoting the axis of rotation.

If only `rotX` is passed, then `rotX` is used as the value for the z-coordinate, and the x- and -y-coordinates are both set to zero.

### Return value

A `DOMMatrix`.

## Examples

```js
const matrix = new DOMMatrix(); // create a matrix
console.log(matrix.toString());
// output: "matrix(1, 0, 0, 1, 0, 0)"

const rotated = matrix.rotate(30); // rotation and assignment
console.log(matrix.toString()); // original matrix is unchanged
// output: "matrix(1, 0, 0, 1, 0, 0)"
console.log(rotated.toString());
// output: "matrix(0.866, 0.5, -0.5, 0.866, 0, 0)"
```

## See also

- `DOMMatrix.rotateSelf()`
- `DOMMatrixReadOnly.rotateAxisAngle()`
- `DOMMatrixReadOnly.rotateFromVector()`
- CSS `transform` property and `rotate3d()` function
- CSS `rotate` property
- CSS transforms module
- SVG `transform` attribute
- `CanvasRenderingContext2D` interface and `rotate()` method
