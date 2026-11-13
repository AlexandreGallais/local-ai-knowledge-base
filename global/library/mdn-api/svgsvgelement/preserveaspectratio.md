---
title: "SVGSVGElement: preserveAspectRatio property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgsvgelement/preserveaspectratio/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
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
