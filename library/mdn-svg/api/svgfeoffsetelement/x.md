---
title: "SVGFEOffsetElement: x property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfeoffsetelement/x/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEOffsetElement: x property

The **`x`** read-only property of the `SVGFEOffsetElement` interface describes the horizontal coordinate of the position of an SVG filter primitive as a `SVGAnimatedLength`.

It reflects the `x` attribute of the `<feOffset>` element, which offsets the input image relative to its current position. The attribute is a `<length>` or `<percentage>`. The `<coordinate>` is a length in the user coordinate system that is the given distance from the origin of the user coordinate system along the x-axis. If the `x` attribute is a percent value, the property value is relative to the width of the filter region in user coordinate system units. The default value is `0`.

## Value

An `SVGAnimatedLength`.

## Example

```js
const feOffset = document.querySelector("feOffset");
const leftPosition = feOffset.x;
console.log(leftPosition.baseVal.value); // the `x` value
```

## See also

- `SVGFEOffsetElement.y`
