---
title: "SVGRectElement: height property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgrectelement/height/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
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
