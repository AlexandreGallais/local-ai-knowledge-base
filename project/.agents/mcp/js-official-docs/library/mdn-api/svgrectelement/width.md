---
title: "SVGRectElement: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgrectelement/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGRectElement: width property

The **`width`** read-only property of the `SVGRectElement` interface describes the horizontal size of an SVG rectangle as a `SVGAnimatedLength`. The length is in user coordinate system units along the x-axis. Its syntax is the same as that for `<length>`.

It reflects the `<rect>` element's `width` presentational attribute. The CSS `width` property takes precedence over the SVG `width` presentational attribute, so the value may not reflect the elements actual size. The default value is `0`.

## Value

An `SVGAnimatedLength`.

## Example

```js
const rectangle = document.querySelector("rect");
const rectWidth = rectangle.width;
console.log(rectWidth.baseVal.value); // the `width` value
```

## See also

- `DOMRect.width`
- `SVGRectElement.height`
