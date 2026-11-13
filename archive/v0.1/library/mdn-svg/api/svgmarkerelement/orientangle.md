---
title: "SVGMarkerElement: orientAngle property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgmarkerelement/orientangle/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGMarkerElement: orientAngle property

The **`orientAngle`** read-only property of the `SVGMarkerElement` interface returns an `SVGAnimatedAngle` object containing the angle of the `orient` attribute.

## Value

An `SVGAnimatedAngle` object. The `baseVal` property of this object returns an `SVGAngle`, the value of which returns the `angle`.

## Examples

The `orientAngle` property returns an `SVGAnimatedAngle` which contains an `SVGAngle` with the angle set by the `orient` attribute as a number representing the number of degrees the marker is turned.

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
      orient=".5turn">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
  </defs>
</svg>
```

```js
let marker = document.getElementById("arrow");
console.log(marker.orientAngle.baseVal.value); // 180 as .5turn is 180deg.
```
