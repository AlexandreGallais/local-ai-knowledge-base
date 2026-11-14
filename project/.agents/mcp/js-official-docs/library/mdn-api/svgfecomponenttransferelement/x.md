---
title: "SVGFEComponentTransferElement: x property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfecomponenttransferelement/x/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEComponentTransferElement: x property

The **`x`** read-only property of the `SVGFEComponentTransferElement` interface describes the horizontal coordinate of the position of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `<feComponentTransfer>` element's `x` filter primitive attribute value. The attribute is a `<length>` or `<percentage>`. The `<coordinate>` is a length in the user coordinate system that is the given distance from the origin of the user coordinate system along the x-axis. If the `x` attribute is a percent value, the property value is relative to the width of the filter region in user coordinate system units. The default value is `0`.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feComponentTransfer = document.querySelector("feComponentTransfer");
const leftPosition = feComponentTransfer.x;
console.log(leftPosition.baseVal.value); // the `x` value
```

## See also

- `SVGFEComponentTransferElement.y`
- `<feFuncR>`, `<feFuncG>`, `<feFuncB>`, `<feFuncA>`
