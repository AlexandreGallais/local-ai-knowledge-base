---
title: "SVGFESpecularLightingElement: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfespecularlightingelement/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFESpecularLightingElement: width property

The **`width`** read-only property of the `SVGFESpecularLightingElement` interface describes the horizontal size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `width` attribute of the `<feSpecularLighting>` element, which lights a source graphic using the alpha channel as a bump map. The attribute is a `<length>` or a `<percentage>` relative to the width of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feSpecularLighting = document.querySelector("feSpecularLighting");
const horizontalSize = feSpecularLighting.width;
console.log(horizontalSize.baseVal.value); // the `width` value
```

## See also

- `SVGFESpecularLightingElement.height`
- `SVGFEDiffuseLightingElement`
- CSS `lighting-color` property
