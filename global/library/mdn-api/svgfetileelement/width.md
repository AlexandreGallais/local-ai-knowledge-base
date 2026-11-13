---
title: "SVGFETileElement: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfetileelement/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
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
