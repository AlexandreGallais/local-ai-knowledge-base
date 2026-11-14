---
title: "SVGRectElement: y property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgrectelement/y/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGRectElement: y property

The **`y`** read-only property of the `SVGRectElement` interface describes the vertical coordinate of the position of an SVG rectangle as a `SVGAnimatedLength`. The `<coordinate>` is a length in the user coordinate system that is the given distance from the origin of the user coordinate system along the y-axis. Its syntax is the same as that for `<length>`.

It reflects the `<rect>` element's `y` geometric attribute value. The CSS `y` property takes precedence over the SVG `y` attribute, so the value may not reflect the element's appearance. The default value is `0`.

## Value

An `SVGAnimatedLength`.

## Example

```js
const rectangle = document.querySelector("rect");
const topPosition = rectangle.y;
console.log(topPosition.baseVal.value); // the `y` value
```

## See also

- `DOMRect.y`
- `SVGRectElement.x`
