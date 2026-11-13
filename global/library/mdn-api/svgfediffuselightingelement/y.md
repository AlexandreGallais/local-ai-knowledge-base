---
title: "SVGFEDiffuseLightingElement: y property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfediffuselightingelement/y/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEDiffuseLightingElement: y property

The **`y`** read-only property of the `SVGFEDiffuseLightingElement` interface describes the vertical coordinate of the position of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `<feDiffuseLighting>` element's `y` filter primitive attribute value. The filter lights an image using the alpha channel as a bump map. The attribute is a `<length>` or `<percentage>`. The `<coordinate>` is a length in the user coordinate system that is the given distance from the origin of the filter along the y-axis. If the `y` attribute is a percent value, the property value is a relative to the height of the filter region in user coordinate system units. The default value is `0`.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feDiffuseLighting = document.querySelector("feDiffuseLighting");
const topPosition = feDiffuseLighting.y;
console.log(topPosition.baseVal.value); // the `y` value
```

## See also

- `SVGFEDiffuseLightingElement.x`
- `SVGFESpecularLightingElement`
- `<feSpecularLighting>`
- CSS `blend-mode` data type
- CSS `mix-blend-mode` property
