---
title: "SVGPreserveAspectRatio: meetOrSlice property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgpreserveaspectratio/meetorslice/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGPreserveAspectRatio: meetOrSlice property

The **`meetOrSlice`** property of the `SVGPreserveAspectRatio` interface reflects the type of the meet-or-slice value as specified by one of the `SVG_MEETORSLICE_*` constants defined on this interface.

## Value

One of the following:

- `SVGPreserveAspectRatio.SVG_MEETORSLICE_UNKNOWN` (0)
- `SVGPreserveAspectRatio.SVG_MEETORSLICE_MEET` (1)
- `SVGPreserveAspectRatio.SVG_MEETORSLICE_SLICE` (2)

## Examples

### Accessing the `meetOrSlice` property

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="400"
  height="200"
  preserveAspectRatio="xMidYMid slice">
  <circle cx="100" cy="100" r="50" fill="blue" />
</svg>
```

```js
const svgElement = document.querySelector("svg");

// Access the meetOrSlice property
console.log(svgElement.preserveAspectRatio.baseVal.meetOrSlice); // Output: 2 (SVG_MEETORSLICE_SLICE)
```
