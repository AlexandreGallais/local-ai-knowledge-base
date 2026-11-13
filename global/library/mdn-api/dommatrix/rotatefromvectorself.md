---
title: "DOMMatrix: rotateFromVectorSelf() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dommatrix/rotatefromvectorself/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMMatrix: rotateFromVectorSelf() method

The `rotateFromVectorSelf()` method of the `DOMMatrix` interface is a mutable transformation method that modifies a matrix by rotating the matrix by the angle between the specified vector and `(1, 0)`. The rotation angle is determined by the angle between the vector `(1,0)T` and `(x,y)T` in the clockwise direction, or `(+/-)arctan(y/x)`. If `x` and `y` are both `0`, the angle is specified as `0`, and the matrix is not altered.

To rotate a matrix from a vector without mutating it, see `DOMMatrixReadOnly.rotateFromVector()`, which creates a new rotated matrix while leaving the original unchanged.

## Syntax

```js
rotateFromVectorSelf()
rotateFromVectorSelf(rotX)
rotateFromVectorSelf(rotX, rotY)
```

### Parameters

- `rotX` (optional)
    A number; the x-coordinate of x,y vector that determines the rotation angle. If undefined, `0` is used.
- `rotY` (optional)
    A number; the y-coordinate of x,y vector that determines the rotation angle. If undefined, `0` is used.

### Return value

Returns itself; the updated `DOMMatrix`.

## Examples

```js
const matrix = new DOMMatrix(); // create a matrix
console.log(matrix.rotateFromVectorSelf().toString());
// output: matrix(1, 0, 0, 1, 0, 0) (no rotation applied)
console.log(matrix.rotateFromVectorSelf(10, 20).toString());
// output: matrix(0.447, 0.894, -0.894, 0.447, 0, 0)
console.log(matrix.toString());
// output: matrix(0.447, 0.894, -0.894, 0.447, 0, 0) (same as above)
```

## See also

- `DOMMatrixReadOnly.rotateFromVector()`
- `DOMMatrix.rotateSelf()`
- `DOMMatrix.rotateAxisAngleSelf()`
- CSS `transform` property and `rotate3d()` function
- CSS `rotate` property
- CSS transforms module
- SVG `transform` attribute
- `CanvasRenderingContext2D` interface and `rotate()` method
