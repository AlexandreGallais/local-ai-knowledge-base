---
title: "DOMMatrix: skewYSelf() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dommatrix/skewyself/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMMatrix: skewYSelf() method

The `skewYSelf()` method of the `DOMMatrix` interface is a mutable transformation method that modifies a matrix. It skews the source matrix by applying the specified skew transformation along the Y-axis and returns the skewed matrix.

To skew a matrix along the Y-axis without mutating it, see `DOMMatrixReadOnly.skewY()`

## Syntax

```js
skewYSelf()
skewYSelf(sY)
```

### Parameters

- `sY`
    A number; the angle, in degrees, by which to skew the matrix along the Y axis.

### Return value

Returns itself; the `DOMMatrix` skewed along the Y-axis by the given
angle.

## Examples

```js
const matrix = new DOMMatrix(); // create a matrix
console.log(matrix.toString()); // output: "matrix(1, 0, 0, 1, 0, 0)"
matrix.skewYSelf(-14); // mutate it
console.log(matrix); // output: "matrix(1, -0.25, 0, 1, 0, 0)"
```

## See also

- `DOMMatrixReadOnly.skewY()`
- CSS `transform` property
- CSS `transform-function` functions
  - `skew()`
  - `skewX()`
  - `skewY()`
- CSS transforms module
- SVG `transform` attribute
- `CanvasRenderingContext2D` interface methods
  - `CanvasRenderingContext2D.transform()`
  - `CanvasRenderingContext2D.setTransform()`
  - `CanvasRenderingContext2D.resetTransform()`
