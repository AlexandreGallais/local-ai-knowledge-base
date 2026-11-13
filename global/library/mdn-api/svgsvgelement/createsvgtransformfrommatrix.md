---
title: "SVGSVGElement: createSVGTransformFromMatrix() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgsvgelement/createsvgtransformfrommatrix/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGSVGElement: createSVGTransformFromMatrix() method

The `createSVGTransformFromMatrix()` method of the `SVGSVGElement` interface creates an `SVGTransform` object outside of any document trees, based on the given `DOMMatrix` object.

## Syntax

```js
createSVGTransformFromMatrix(matrix)
```

### Parameters

- `matrix`
    A `DOMMatrix` object representing the initial matrix for the transform.

### Return value

An `SVGTransform` object, initialized to the given matrix transform. It is a `matrix()` transform if the `matrix` is 2D, and a `matrix3d()` transform otherwise.

## Examples

### Creating a Transform from a Matrix

```html
<svg id="exampleSVG" width="200" height="200">
  <rect id="exampleRect" x="50" y="50" width="100" height="50" fill="blue" />
</svg>
```

```js
const svgElement = document.getElementById("exampleSVG");
const rectElement = document.getElementById("exampleRect");

// Create a new matrix
const matrix = svgElement.createSVGMatrix();
matrix.a = 1; // Scale x
matrix.d = 1; // Scale y
matrix.e = 50; // Translate x
matrix.f = 50; // Translate y

// Create a new SVGTransform from the matrix
const transform = svgElement.createSVGTransformFromMatrix(matrix);

// Apply the transform to the rectangle
rectElement.transform.baseVal.appendItem(transform);
```

## See also

- `SVGTransform`
- `DOMMatrix`
