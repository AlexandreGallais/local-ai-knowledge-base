---
title: "SVGFETileElement: height property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfetileelement/height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFETileElement: height property

The **`height`** read-only property of the `SVGFETileElement` interface describes the vertical size of an SVG filter primitive as an `SVGAnimatedLength`.

It reflects the `height` attribute of the `<feTile>` element, which fills a target rectangle with a repeated, tiled pattern of an input image. The attribute is a `<length>` or a `<percentage>` relative to the height of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feTile = document.querySelector("feTile");
const verticalSize = feTile.height;
console.log(verticalSize.baseVal.value); // the `height` value
```

## See also

- `SVGFETileElement.width`
- `SVGPatternElement`
