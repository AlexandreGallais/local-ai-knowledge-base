---
title: "SVGFEDropShadowElement: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfedropshadowelement/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEDropShadowElement: width property

The **`width`** read-only property of the `SVGFEDropShadowElement` interface describes the horizontal size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `width` filter primitive attribute. The attribute is a `<length>` or a `<percentage>` relative to the width of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feDropShadow = document.querySelector("feDropShadow");
const horizontalSize = feDropShadow.width;
console.log(horizontalSize.baseVal.value); // the `width` value
```

## See also

- `SVGFEDropShadowElement.height`
- CSS `drop-shadow()` function
- CSS `box-shadow` property
- CSS `text-shadow` property
- CSS `blend-mode` data type
- CSS `mix-blend-mode` property
