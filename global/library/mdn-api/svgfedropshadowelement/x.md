---
title: "SVGFEDropShadowElement: x property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfedropshadowelement/x/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEDropShadowElement: x property

The **`x`** read-only property of the `SVGFEDropShadowElement` interface describes the horizontal coordinate of the position of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `x` attribute of the `<feDropShadow>` element, which creates a drop shadow of an input image. The attribute is a `<length>` or `<percentage>`. The `<coordinate>` is a length in the user coordinate system that is the given distance from the origin of the user coordinate system along the x-axis. If the `x` attribute is a percent value, the property value is relative to the width of the filter region in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feDropShadow = document.querySelector("feDropShadow");
const leftPosition = feDropShadow.x;
console.log(leftPosition.baseVal.value); // the `x` value
```

## See also

- `SVGFEDropShadowElement.y`
- CSS `drop-shadow()` function
- CSS `box-shadow` property
- CSS `text-shadow` property
- CSS `blend-mode` data type
- CSS `mix-blend-mode` property
