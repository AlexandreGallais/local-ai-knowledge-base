---
title: "SVGFEImageElement: width property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfeimageelement/width/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEImageElement: width property

The **`width`** read-only property of the `SVGFEImageElement` interface describes the horizontal size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `width` attribute of the `<feImage>` element, which fetches image data from an external source and provides the pixel data as output. The attribute is a `<length>` or a `<percentage>` relative to the width of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feImage = document.querySelector("feImage");
const horizontalSize = feImage.width;
console.log(horizontalSize.baseVal.value); // the `width` value
```

## See also

- `SVGFEImageElement.height`
- SVG tutorial: Filter effects
- SVG Filter primitive attributes
- CSS `blend-mode` data type
- CSS `mix-blend-mode` property
