---
title: "DOMMatrixReadOnly: flipX() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dommatrixreadonly/flipx/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMMatrixReadOnly: flipX() method

The **`flipX()`** method of the `DOMMatrixReadOnly` interface creates a new matrix being the result of the original matrix flipped about the x-axis. This is equivalent to multiplying the matrix by `DOMMatrix(-1, 0, 0, 1, 0, 0)`. The original matrix is not modified.

## Syntax

```js
flipX()
```

### Parameters

None.

### Return value

Returns a `DOMMatrix`.

## Examples

### Inverting a triangle

In this example, the SVG contains two paths in the shape of a triangle, both drawn to the same position. Note that the x co-ordinate of the viewBox attribute is negative, showing us content from both sides of the x-axis.

#### HTML

```html
<svg width="100" height="100" viewBox="-50 0 100 100">
  <path fill="red" d="M 0 50 L 50 0 L 50 100 Z" />
  <path id="flipped" fill="blue" d="M 0 50 L 50 0 L 50 100 Z" />
</svg>
```

#### JavaScript

The JavaScript first creates an identity matrix, then uses the `flipX()` method to create a new matrix, which is then applied to the blue triangle, inverting it across the x-axis. The red triangle is left in place.

```js
const flipped = document.getElementById("flipped");
const matrix = new DOMMatrixReadOnly();
const flippedMatrix = matrix.flipX();
flipped.setAttribute("transform", flippedMatrix.toString());
```

#### Result

## See also

- `DOMMatrixReadOnly.flipY()`
