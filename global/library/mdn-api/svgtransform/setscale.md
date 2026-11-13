---
title: "SVGTransform: setScale() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgtransform/setscale/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGTransform: setScale() method

The `setScale()` method of the `SVGTransform` interface sets the transform type to `SVG_TRANSFORM_SCALE`, with parameters `sx` and `sy` defining the scale amounts.

## Syntax

```js
setScale(sx, sy)
```

### Parameters

- `sx`
    A float defining the scale amount along the X-axis.
- `sy`
    A float defining the scale amount along the Y-axis.

### Return value

None (`undefined`).

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if the attribute or the `SVGTransform` object is read-only.

## Examples

### Scaling an SVG Element

```js
// Select an SVG element and create a transform object
const svgElement = document.querySelector("svg");
const transform = svgElement.createSVGTransform();

// Set the scale values for the transform
transform.setScale(2, 3);

// Output the scale details
console.log(`Scale X: ${transform.matrix.a}`); // Output: 2
console.log(`Scale Y: ${transform.matrix.d}`); // Output: 3
```
