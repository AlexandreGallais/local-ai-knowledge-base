---
title: "SVGSVGElement: y property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgsvgelement/y/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGSVGElement: y property

The **`y`** read-only property of the `SVGSVGElement` interface describes the vertical coordinate of the position of that SVG as an `SVGAnimatedLength`. When an `` is nested within another ``, the vertical coordinate is a length in the user coordinate system that is the given distance from the origin of the user coordinate system along the y-axis. Its syntax is the same as that for `<length>`.

It reflects the `` element's `y` geometric attribute. The default value is `0`. The `y` attribute has no effect on outermost `` elements; only on nested ones. The CSS `y` property takes precedence over the `` element's `y` attribute, so the value may not reflect the element's appearance.

## Value

An `SVGAnimatedLength`.

## Example

```js
const svg = document.querySelector("svg");
const topPosition = svg.y;
console.dir(leftPosition.baseVal.value); // the `y` value
```

## See also

- `SVGSVGElement.x`
- `SVGAnimatedLength.baseVal`
