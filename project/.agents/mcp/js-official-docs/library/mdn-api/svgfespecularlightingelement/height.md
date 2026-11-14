---
title: "SVGFESpecularLightingElement: height property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfespecularlightingelement/height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFESpecularLightingElement: height property

The **`height`** read-only property of the `SVGFESpecularLightingElement` interface describes the vertical size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `height` attribute of the `<feSpecularLighting>` element, which lights a source graphic using the alpha channel as a bump map. The attribute is a `<length>` or a `<percentage>` relative to the height of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feSpecularLighting = document.querySelector("feSpecularLighting");
const verticalSize = feSpecularLighting.height;
console.log(verticalSize.baseVal.value); // the `height` value
```

## See also

- `SVGFESpecularLightingElement.width`
- `SVGFEDiffuseLightingElement`
- CSS `lighting-color` property
