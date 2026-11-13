---
title: "SVGTransform: setSkewY() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgtransform/setskewy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGTransform: setSkewY() method

The `setSkewY()` method of the `SVGTransform` interface sets the transform type to `SVG_TRANSFORM_SKEWY`, with parameter `angle` defining the amount of skew along the Y-axis.

## Syntax

```js
setSkewY(angle)
```

### Parameters

- `angle`
    A float defining the amount of skew in degrees.

### Return value

None (`undefined`).

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if the attribute or the `SVGTransform` object is read-only.

## Examples

### Skewing an SVG Element Along the Y-Axis

```js
// Select an SVG element and create a transform object
const svgElement = document.querySelector("svg");
const transform = svgElement.createSVGTransform();

// Apply a skew of 30 degrees along the Y-axis
transform.setSkewY(30);

// Log the applied transformation angle
console.log(`Skew Angle: ${transform.angle}`); // Output: 30
```

## See also

- `SVGTransform.angle`
