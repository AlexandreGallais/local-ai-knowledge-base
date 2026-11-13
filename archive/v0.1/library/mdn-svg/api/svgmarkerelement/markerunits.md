---
title: "SVGMarkerElement: markerUnits property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgmarkerelement/markerunits/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGMarkerElement: markerUnits property

The **`markerUnits`** read-only property of the `SVGMarkerElement` interface returns an `SVGAnimatedEnumeration` object. This object returns an integer which represents the keyword values that the `markerUnits` attribute accepts.

## Value

An `SVGAnimatedEnumeration` object. The `baseVal` property of this object contains one of the following values:

- `0`
    `SVG_MARKERUNITS_UNKNOWN` which means that the `markerUnits` attribute has a value other than the two predefined keywords.
- `1`
    `SVG_MARKERUNITS_USERSPACEONUSE` which means that the `markerUnits` attribute has the keyword value `userSpaceOnUse`.
- `2`
    `SVG_MARKERUNITS_STROKEWIDTH` which means that the `markerUnits` attribute has the keyword value `strokeWidth`.

## Examples

The `markerUnits` property returns an `SVGAnimatedEnumeration` object that contains the value of the `markerUnits` attribute.

```html
<svg id="svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker
      id="arrow"
      viewBox="0 0 10 10"
      refX="5"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse"
      markerUnits="strokeWidth">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
  </defs>
</svg>
```

```js
let marker = document.getElementById("arrow");
console.log(marker.markerUnits.baseVal); // 2
```
