---
title: "SVGFEDiffuseLightingElement: height property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfediffuselightingelement/height/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEDiffuseLightingElement: height property

The **`height`** read-only property of the `SVGFEDiffuseLightingElement` interface describes the vertical size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `<feDiffuseLighting>` element's `height` filter primitive attribute. The filter lights an image using the alpha channel as a bump map. The attribute is a `<length>` or a `<percentage>` relative to the height of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feDiffuseLighting = document.querySelector("feDiffuseLighting");
const verticalSize = feDiffuseLighting.height;
console.log(verticalSize.baseVal.value); // the `height` value
```

## See also

- `SVGFEDiffuseLightingElement.width`
- `SVGFESpecularLightingElement`
- `<feSpecularLighting>`
- CSS `blend-mode` data type
- CSS `mix-blend-mode` property
