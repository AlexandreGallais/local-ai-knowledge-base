---
title: "SVGFEBlendElement: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfeblendelement/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEBlendElement: width property

The **`width`** read-only property of the `SVGFEBlendElement` interface describes the horizontal size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `<feBlend>` element's `width` filter primitive attribute. The attribute is a `<length>` or a `<percentage>` relative to the width of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

The `<feBlend>` SVG filter blends two input images together using commonly used imaging software blending modes.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feBlend = document.querySelector("feBlend");
const horizontalSize = feBlend.width;
console.log(horizontalSize.baseVal.value); // the `width` value
```

## See also

- `SVGFEBlendElement.height`
- CSS `blend-mode` data type
- CSS `mix-blend-mode` property
