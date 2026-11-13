---
title: "SVGRectElement: x property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgrectelement/x/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGRectElement: x property

The **`x`** read-only property of the `SVGRectElement` interface describes the horizontal coordinate of the position of an SVG rectangle as a `SVGAnimatedLength`. The `<coordinate>` is a length in the user coordinate system that is the given distance from the origin of the user coordinate system along the x-axis. Its syntax is the same as that for `<length>`.

It reflects the `<rect>` element's `x` geometric attribute value. The CSS `x` property takes precedence over the SVG `x` geometric attribute, so the value may not reflect the element's appearance. The default value is `0`.

## Value

An `SVGAnimatedLength`.

## Example

```js
const rectangle = document.querySelector("rect");
const leftPosition = rectangle.x;
console.log(leftPosition.baseVal.value); // the `x` value
```

## See also

- `DOMRect.x`
- `SVGRectElement.y`
