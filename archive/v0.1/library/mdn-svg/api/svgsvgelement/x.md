---
title: "SVGSVGElement: x property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgsvgelement/x/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGSVGElement: x property

The **`x`** read-only property of the `SVGSVGElement` interface describes the horizontal coordinate of the position of that SVG as an `SVGAnimatedLength`. When an `` is nested within another ``, the horizontal coordinate is a length in the user coordinate system that is the given distance from the origin of the user coordinate system along the x-axis. Its syntax is the same as that for `<length>`.

It reflects the `` element's `x` geometric attribute. The default value is `0`. The `x` attribute has no effect on outermost `` elements; only one nested ones. The CSS `x` property takes precedence over the `` element's `x` attribute, so the value may not reflect the element's appearance.

## Value

An `SVGAnimatedLength`.

## Example

```js
const svg = document.querySelector("svg");
const leftPosition = svg.x;
console.dir(leftPosition.baseVal.value); // the `x` value
```

## See also

- `SVGSVGElement.y`
- `SVGAnimatedLength.baseVal`
