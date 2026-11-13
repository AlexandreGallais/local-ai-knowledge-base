---
title: "SVGFEDiffuseLightingElement: width property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfediffuselightingelement/width/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEDiffuseLightingElement: width property

The **`width`** read-only property of the `SVGFEDiffuseLightingElement` interface describes the horizontal size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `<feDiffuseLighting>` element's `width` filter primitive attribute. The filter lights an image using the alpha channel as a bump map. The attribute is a `<length>` or a `<percentage>` relative to the width of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feDiffuseLighting = document.querySelector("feDiffuseLighting");
const horizontalSize = feDiffuseLighting.width;
console.log(horizontalSize.baseVal.value); // the `width` value
```

## See also

- `SVGFEDiffuseLightingElement.height`
- `SVGFESpecularLightingElement`
- `<feSpecularLighting>`
- CSS `blend-mode` data type
- CSS `mix-blend-mode` property
