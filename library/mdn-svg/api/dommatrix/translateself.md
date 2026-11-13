---
title: "DOMMatrix: translateSelf() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dommatrix/translateself/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMMatrix: translateSelf() method

The `translateSelf()` method of the `DOMMatrix` interface is a mutable transformation method that modifies a matrix. It applies the specified vectors and returns the updated matrix. The default vector is `[0, 0, 0]`.

To translate a matrix without mutating it, see `DOMMatrixReadOnly.translate()`

## Syntax

```js
translateSelf(translateX, translateY)
translateSelf(translateX, translateY, translateZ)
```

### Parameters

- `translateX`
    A number representing the abscissa (x-coordinate) of the translating vector.
- `translateY`
    A number representing the ordinate (y-coordinate) of the translating vector.
- `translateZ` (optional)
    A number representing the z component of the translating vector. If not supplied,
    this defaults to 0. If this is anything other than 0, the resulting matrix will be
    3D.

### Return value

Returns itself; the `DOMMatrix` translated by the given
vector.

## Examples

```js
const matrix = new DOMMatrix(); // create a matrix
console.log(matrix.toString()); // output: "matrix(1, 0, 0, 1, 0, 0)"
matrix.translateSelf(25, 25); // mutate it
console.log(matrix); // output: "matrix(1, 0, 0, 1, 25, 25)"
```

## See also

- `DOMMatrixReadOnly.translate()`
- CSS `transform` property
- CSS `translate` property
- CSS `transform-function` functions
  - `translate()`
  - `translate3d()`
  - `translateX()`
  - `translateY()`
  - `translateZ()`
- CSS transforms module
- SVG `transform` attribute
- `CanvasRenderingContext2D` interface methods
  - `CanvasRenderingContext2D.translate()`
  - `CanvasRenderingContext2D.transform()`
  - `CanvasRenderingContext2D.setTransform()`
  - `CanvasRenderingContext2D.resetTransform()`
