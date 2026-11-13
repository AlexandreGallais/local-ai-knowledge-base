---
title: "SVGFEDisplacementMapElement: width property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfedisplacementmapelement/width/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEDisplacementMapElement: width property

The **`width`** read-only property of the `SVGFEDisplacementMapElement` interface describes the horizontal size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `<feDisplacementMap>` element's `width` filter primitive attribute. The attribute is a `<length>` or a `<percentage>` relative to the width of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feDisplacementMap = document.querySelector("feDisplacementMap");
const horizontalSize = feDisplacementMap.width;
console.log(horizontalSize.baseVal.value); // the `width` value
```

## See also

- `SVGFEDisplacementMapElement.height`
- `SVGFEImageElement` API and `<feImage>` element
- `SVGFETurbulenceElement` API and `<feTurbulence>` element
- CSS `blend-mode` data type
- CSS `mix-blend-mode` property
