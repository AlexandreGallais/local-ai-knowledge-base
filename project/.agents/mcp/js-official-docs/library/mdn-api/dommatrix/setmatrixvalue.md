---
title: "DOMMatrix: setMatrixValue() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dommatrix/setmatrixvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMMatrix: setMatrixValue() method

The **`setMatrixValue()`** method of the `DOMMatrix` interface replaces the contents of the matrix with the matrix described by the specified transform or transforms, returning itself.

## Syntax

```js
setMatrixValue(transformList)
```

### Parameters

- `transformList`
    A string. Its value follows the same syntax as the CSS `transform` property value.

### Return value

Returns itself; the `DOMMatrix` with updated values.

## Examples

In this example, we create a matrix, apply a 3D transform using the `DOMMatrix.translateSelf()` method, revert it to a 2D transform using the `setMatrixValue()` method, then revert it back to a 3D transform with another `setMatrixValue()` method call.

```js
const matrix = new DOMMatrix();

console.log(matrix.toString()); // matrix(1, 0, 0, 1, 0, 0)
console.log(matrix.is2D); // true

matrix.translateSelf(30, 40, 50);
console.log(matrix.toString()); // matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 30, 40, 50, 1)
console.log(matrix.is2D); // false

matrix.setMatrixValue("matrix(1, 0, 0, 1, 15, 45)");
console.log(matrix.toString()); // output: matrix(1, 0, 0, 1, 15, 45)
console.log(matrix.is2D); // true

matrix.setMatrixValue(
  "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 30, 40, 50, 1)",
);
console.log(matrix.toString()); // matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 30, 40, 50, 1)
console.log(matrix.is2D); // false
```

## See also

- `DOMMatrix.translateSelf()`
- `DOMMatrixReadOnly.is2D`
- CSS `matrix()` function
- CSS `matrix3d()` function
