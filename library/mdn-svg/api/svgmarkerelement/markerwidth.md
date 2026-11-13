---
title: "SVGMarkerElement: markerWidth property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgmarkerelement/markerwidth/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGMarkerElement: markerWidth property

The **`markerWidth`** read-only property of the `SVGMarkerElement` interface returns an `SVGAnimatedLength` object containing the width of the `<marker>` viewport as defined by the `markerWidth` attribute.

## Value

An `SVGAnimatedLength` object. The `baseVal` property of this object returns an `SVGLength`, the value of which returns the `width`.

## Examples

The `markerWidth` property returns an `SVGAnimatedLength` which contains an `SVGLength` with the value of the `markerWidth` attribute.

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
      orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
  </defs>
</svg>
```

```js
let marker = document.getElementById("arrow");
console.log(marker.markerWidth.baseVal.value); // 6
```
