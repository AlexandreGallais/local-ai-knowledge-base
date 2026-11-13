---
title: "SVGFEComponentTransferElement: width property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfecomponenttransferelement/width/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEComponentTransferElement: width property

The **`width`** read-only property of the `SVGFEComponentTransferElement` interface describes the horizontal size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `<feComponentTransfer>` element's `width` filter primitive attribute. The attribute is a `<length>` or a `<percentage>` relative to the width of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feComponentTransfer = document.querySelector("feComponentTransfer");
const horizontalSize = feComponentTransfer.width;
console.log(horizontalSize.baseVal.value); // the `width` value
```

## See also

- `SVGFEComponentTransferElement.height`
- `<feFuncR>`, `<feFuncG>`, `<feFuncB>`, `<feFuncA>` elements
