---
title: "DOMMatrix: skewXSelf() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dommatrix/skewxself/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMMatrix: skewXSelf() method

The `skewXSelf()` method of the `DOMMatrix` interface is a mutable transformation method that modifies a matrix. It skews the source matrix by applying the specified skew transformation along the X-axis and returns the skewed matrix.

To skew a matrix along the X-axis without mutating it, see `DOMMatrixReadOnly.skewX()`

## Syntax

```js
skewXSelf()
skewXSelf(sX)
```

### Parameters

- `sX`
    A number; the angle, in degrees, by which to skew the matrix along the X axis.

### Return value

Returns itself; the `DOMMatrix` skewed along the X-axis by the given
angle.

## Examples

```js
const matrix = new DOMMatrix(); // create a matrix
console.log(matrix.toString()); // output: "matrix(1, 0, 0, 1, 0, 0)"
matrix.skewXSelf(14); // mutate it
console.log(matrix); // output: "matrix(1, 0, 0.25, 1, 0, 0)"
```

## See also

- `DOMMatrixReadOnly.skewX()`
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
