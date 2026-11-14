---
title: "DOMMatrix: scaleSelf() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dommatrix/scaleself/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMMatrix: scaleSelf() method

The **`scaleSelf()`** method of the `DOMMatrix` interface is a mutable transformation method that modifies a matrix by applying a specified scaling factor, centered on the given origin, with a default origin of `(0, 0)`, returning the scaled matrix.

To scale a matrix without mutating it, see `DOMMatrixReadOnly.scale()`, which creates a new scaled matrix while leaving the original unchanged.

## Syntax

```js
scaleSelf()
scaleSelf(scaleX)
scaleSelf(scaleX, scaleY)
scaleSelf(scaleX, scaleY, scaleZ)
scaleSelf(scaleX, scaleY, scaleZ, originX)
scaleSelf(scaleX, scaleY, scaleZ, originX, originY)
scaleSelf(scaleX, scaleY, scaleZ, originX, originY, originZ)
```

### Parameters

- `scaleX` (optional)
    A multiplier for the scale value on the x-axis. If not supplied, this defaults to `1`.
- `scaleY` (optional)
    A multiplier for the scale value on the y-axis. If not supplied, this defaults to the value of `scaleX`.
- `scaleZ` (optional)
    A multiplier for the scale value on the z-axis. If this value is anything other than 1, the resulting matrix will be 3D.
- `originX` (optional)
    An x-coordinate for the origin of the transformation. If no origin is supplied, this defaults to 0.
- `originY` (optional)
    A y-coordinate for the origin of the transformation. If no origin is supplied, this defaults to 0.
- `originZ` (optional)
    A z-coordinate for the origin of the transformation. If no origin is supplied, this defaults to 0. If this value is anything other than 0, the resulting matrix will be 3D.

### Return value

Returns itself; a `DOMMatrix`.

If a scale is applied about the z-axis, the matrix will be a 4✕4 3D matrix.

## Examples

This SVG contains two semi-opaque squares, one red and one blue, each positioned at the document origin:

```html
<svg viewBox="0 0 50 50" height="200">
  <rect width="25" height="25" fill="#ff000099" />
  <rect id="transformed" width="25" height="25" fill="#0000ff99" />
</svg>
```

This JavaScript first creates a matrix, then scales the matrix to one that halves the width and doubles the height, using the `scaleSelf()` method.

The matrix is then applied to the blue square as a
`transform`, changing its dimensions and position. The red square is left
unchanged.

```js
const matrix = new DOMMatrix();
matrix.scaleSelf(0.5, 2);

document
  .querySelector("#transformed")
  .setAttribute("transform", matrix.toString());
```

## See also

- `DOMMatrixReadOnly.scale()`
- `DOMMatrix.scale3dSelf()`
- CSS `transform` property and the `scaleSelf()` and `matrix()` functions
- CSS transforms module
- SVG `transform` attribute
- `CanvasRenderingContext2D` interface `transform()` method
