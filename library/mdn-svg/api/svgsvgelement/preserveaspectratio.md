---
title: "SVGSVGElement: preserveAspectRatio property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgsvgelement/preserveaspectratio/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGSVGElement: preserveAspectRatio property

The **`preserveAspectRatio`** read-only property of the `SVGSVGElement` interface reflects the `preserveAspectRatio` attribute of the given element. It defines how the SVG element's content should be scaled to fit the given space, preserving its aspect ratio.

## Value

An `SVGAnimatedPreserveAspectRatio` object.

## Example

Given the following SVG, we can use the `preserveAspectRatio` property to retrieve the scaling behavior for the SVG element:

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 200 200"
  preserveAspectRatio="xMidYMid meet">
  <circle cx="100" cy="100" r="50" fill="blue" />
</svg>
```

We can access the `preserveAspectRatio` attribute:

```js
const svgElement = document.querySelector("svg");

console.log(svgElement.preserveAspectRatio.baseVal); // output: SVGPreserveAspectRatio {align: 1, meetOrSlice: 1}
```

## See also

- `preserveAspectRatio`
