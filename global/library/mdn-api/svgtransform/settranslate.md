---
title: "SVGTransform: setTranslate() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgtransform/settranslate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGTransform: setTranslate() method

The `setTranslate()` method of the `SVGTransform` interface sets the transform type to `SVG_TRANSFORM_TRANSLATE`, with parameters `tx` and `ty` defining the translation amounts.

## Syntax

```js
setTranslate(tx, ty)
```

### Parameters

- `tx`
    A float defining the translation amount along the X-axis.
- `ty`
    A float defining the translation amount along the Y-axis.

### Return value

None (`undefined`).

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if the attribute or the `SVGTransform` object is read-only.

## Examples

### Setting Translation Values

```js
// Select an SVG element and create a transform object
const svgElement = document.querySelector("svg");
const transform = svgElement.createSVGTransform();

// Set the translation values for the transform
transform.setTranslate(100, 50);

// Output the translation details
console.log(`X Translation:  ${transform.matrix.e}`); // Output: 100
console.log(`Y Translation: ${transform.matrix.f}`); // Output: 50
```
