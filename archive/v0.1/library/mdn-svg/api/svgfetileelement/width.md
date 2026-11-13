---
title: "SVGFETileElement: width property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfetileelement/width/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFETileElement: width property

The **`width`** read-only property of the `SVGFETileElement` interface describes the horizontal size of an SVG filter primitive as an `SVGAnimatedLength`.

It reflects the `width` attribute of the `<feTile>` element, which fills a target rectangle with a repeated, tiled pattern of an input image. The attribute is a `<length>` or a `<percentage>` relative to the width of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feTile = document.querySelector("feTile");
const horizontalSize = feTile.width;
console.log(horizontalSize.baseVal.value); // the `width` value
```

## See also

- `SVGFETileElement.height`
- `SVGPatternElement`
