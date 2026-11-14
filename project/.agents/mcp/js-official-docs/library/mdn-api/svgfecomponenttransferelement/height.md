---
title: "SVGFEComponentTransferElement: height property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfecomponenttransferelement/height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEComponentTransferElement: height property

The **`height`** read-only property of the `SVGFEComponentTransferElement` interface describes the vertical size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `<feComponentTransfer>` element's `height` filter primitive attribute. The `<feComponentTransfer>` filter performs component-wise color and alpha transparency remapping, allowing for brightness, contrast, color balance and threshold adjustments.

The attribute is a `<length>` or a `<percentage>` relative to the height of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feComponentTransfer = document.querySelector("feComponentTransfer");
const verticalSize = feComponentTransfer.height;
console.log(verticalSize.baseVal.value); // the `height` value
```

## See also

- `SVGFEComponentTransferElement.width`
- `<feFuncR>`, `<feFuncG>`, `<feFuncB>`, `<feFuncA>`
