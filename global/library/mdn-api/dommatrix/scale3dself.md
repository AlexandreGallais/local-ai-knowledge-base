---
title: "DOMMatrix: scale3dSelf() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dommatrix/scale3dself/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMMatrix: scale3dSelf() method

The **`scale3dSelf()`** method of the `DOMMatrix` interface is a mutable transformation method that modifies a matrix by applying a specified scaling factor to all three axes, centered on the given origin, with a default origin of `(0, 0, 0)`, returning the 3D-scaled matrix.

To 3D-scale a matrix without mutating it, see `DOMMatrixReadOnly.scale3d()`, which creates a new scaled matrix while leaving the original unchanged.

## Syntax

```js
scale3dSelf()
scale3dSelf(scale)
scale3dSelf(scale, originX)
scale3dSelf(scale, originX, originY)
scale3dSelf(scale, originX, originY, originZ)
```

### Parameters

- `scale`
    A multiplier; the scale value. If no scale is supplied, this defaults to `1`. If scale is not 1, the `is2D` property of the current matrix is set to `false`.
- `originX` (optional)
    An x-coordinate for the origin of the transformation. If no origin is supplied, this defaults to `0`.
- `originY` (optional)
    A y-coordinate for the origin of the transformation. If no origin is supplied, this defaults to `0`.
- `originZ` (optional)
    A z-coordinate for the origin of the transformation. If no origin is supplied, this defaults to `0`.

### Return value

Returns itself; a `DOMMatrix`.

## Examples

```js
const matrix = new DOMMatrix();
console.log(matrix.scale3dSelf(2).toString());
/* matrix3d(
    2, 0, 0, 0, 
    0, 2, 0, 0, 
    0, 0, 2, 0, 
    0, 0, 0, 1) */
console.log(matrix.scale3dSelf(3.1, 25, 25, 1.25).toString());
/* matrix3d(
    6.2, 0, 0, 0,
    0, 6.2, 0, 0, 
    0, 0, 6.2, 0, 
    -105, -105, -5.25, 1) */
console.log(matrix.toString());
/* matrix3d(
    6.2, 0, 0, 0, 
    0, 6.2, 0, 0, 
    0, 0, 6.2, 0, 
    -105, -105, -5.25, 1) (same as above) */
```

## See also

- `DOMMatrixReadOnly.scale3d()`
- `DOMMatrix.scaleSelf()`
- CSS `transform` property and the `scale3d()` and `matrix3d()` functions
- CSS transforms module
- SVG `transform` attribute
- `CanvasRenderingContext2D` interface `transform()` method
