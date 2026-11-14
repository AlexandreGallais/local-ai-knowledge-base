---
title: "SVGFEImageElement: height property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfeimageelement/height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEImageElement: height property

The **`height`** read-only property of the `SVGFEImageElement` interface describes the vertical size of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `height` attribute of the `<feImage>` element, which fetches image data from an external source and provides the pixel data as output. The attribute is a `<length>` or a `<percentage>` relative to the height of the filter region. The default value is `100%`. The property value is a length in user coordinate system units.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feImage = document.querySelector("feImage");
const verticalSize = feImage.height;
console.log(verticalSize.baseVal.value); // the `height` value
```

## See also

- `SVGFEImageElement.width`
- SVG tutorial: Filter effects
- SVG Filter primitive attributes
- CSS `blend-mode` data type
- CSS `mix-blend-mode` property
