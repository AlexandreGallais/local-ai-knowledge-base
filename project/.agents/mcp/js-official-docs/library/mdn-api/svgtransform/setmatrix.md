---
title: "SVGTransform: setMatrix() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgtransform/setmatrix/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGTransform: setMatrix() method

The `setMatrix()` method of the `SVGTransform` interface sets the transform type to `SVG_TRANSFORM_MATRIX`, with parameter `matrix` defining the new transformation.

Note that the values from the parameter `matrix` are copied, meaning changes to the `matrix` object after calling this method will not affect the transformation.

## Syntax

```js
setMatrix(matrix)
```

### Parameters

- `matrix`
    A live `DOMMatrix` object defining the new transformation matrix to apply.

### Return value

None (`undefined`).

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if the attribute or the `SVGTransform` object is read-only.

## Examples

### Setting a Transformation Matrix

```js
// Get an SVG element and create a transform object
const svgElement = document.querySelector("svg");
const transform = svgElement.createSVGTransform();

// Create a DOMMatrix with specific values
const matrix = new DOMMatrix();
matrix.a = 1; // Scale X
matrix.d = 1; // Scale Y
matrix.e = 50; // Translate X
matrix.f = 50; // Translate Y

// Set the transform to the new matrix
transform.setMatrix(matrix);

console.dir(transform.matrix); // Output: SVGMatrix { a: 1, b: 0, c: 0, d: 1, e: 50, f: 50 }
```

## See Also

- `DOMMatrix`
