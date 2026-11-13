---
title: "DOMMatrix: rotateSelf() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dommatrix/rotateself/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMMatrix: rotateSelf() method

The `rotateSelf()` method of the `DOMMatrix` interface is a mutable transformation method that modifies a matrix. It rotates the source matrix around each of its axes by the specified number of degrees and returns the rotated matrix.

To rotate a matrix without mutating it, see `DOMMatrixReadOnly.rotate()`

## Syntax

```js
rotateSelf()
rotateSelf(rotX)
rotateSelf(rotX, rotY)
rotateSelf(rotX, rotY, rotZ)
```

### Parameters

- `rotX`
    A number; the x-coordinate of the vector denoting the axis of rotation
- `rotY` (optional)
    A number; the y-coordinate of the vector denoting the axis of rotation.
- `rotZ` (optional)
    A number; the z-coordinate of the vector denoting the axis of rotation

If only one parameter is passed, `rotZ` is the value of `rotX`, and both `rotX` and `rotY` are `0`, and the rotation is a 2D rotation. If `rotX` and `rotY` are non-zero, the `is2D` is `false`.

### Return value

Returns itself; the `DOMMatrix` rotated by the given
vectors.

## Examples

```js
const matrix = new DOMMatrix(); // create a matrix
console.log(matrix.toString()); // output: "matrix(1, 0, 0, 1, 0, 0)"
matrix.rotateSelf(30); // mutate it
console.log(matrix); // output: "matrix(0.866, 0.5, -0.5, 0.866, 0, 0)"
```

## See also

- `DOMMatrixReadOnly.rotate()`
- CSS `transform` property
- CSS `rotate` property
- CSS `transform-function` functions
  - `rotate()`
  - `rotate3d()`
  - `rotateX()`
  - `rotateY()`
  - `rotateZ()`
- CSS transforms module
- SVG `transform` attribute
- `CanvasRenderingContext2D` interface methods
  - `CanvasRenderingContext2D.rotate()`
  - `CanvasRenderingContext2D.transform()`
  - `CanvasRenderingContext2D.setTransform()`
  - `CanvasRenderingContext2D.resetTransform()`
