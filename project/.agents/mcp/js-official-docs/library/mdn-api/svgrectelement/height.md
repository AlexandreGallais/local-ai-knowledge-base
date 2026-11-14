---
title: "SVGRectElement: height property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgrectelement/height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGRectElement: height property

The **`height`** read-only property of the `SVGRectElement` interface describes the vertical size of an SVG rectangle as a `SVGAnimatedLength`. The length is in user coordinate system units along the y-axis. Its syntax is the same as that for `<length>`.

It reflects the `<rect>` element's `height` presentational attribute. The CSS `height` property takes precedence over the SVG `height` presentational attribute, so the value may not reflect the elements actual size. The default value is `0`.

## Value

An `SVGAnimatedLength`.

## Example

```js
const rectangle = document.querySelector("rect");
const rectHeight = rectangle.height;
console.log(rectHeight.baseVal.value); // the `height` value
```

## See also

- `DOMRect.height`
- `SVGRectElement.width`
