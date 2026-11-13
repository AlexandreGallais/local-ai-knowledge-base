---
title: "SVGMarkerElement: setOrientToAngle() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgmarkerelement/setorienttoangle/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGMarkerElement: setOrientToAngle() method

The **`setOrientToAngle()`** method of the `SVGMarkerElement` interface sets the value of the `orient` attribute to the value in the `SVGAngle` passed in.

## Syntax

```js
setOrientToAngle(angle)
```

### Parameters

- `angle`
    An `SVGAngle`.

### Return value

None (`undefined`).

## Examples

In the following example the value of the `orient` attribute is updated using `setOrientToAngle()` using an `SVGAngle` created using `SVGSVGElement.createSVGAngle()`.

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
      orient="90">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
  </defs>
</svg>
```

```js
let svg = document.getElementById("svg");
let marker = document.getElementById("arrow");
console.log(marker.orientAngle.baseVal.value); // value in SVG above - 90
let angle = svg.createSVGAngle();
angle.value = "110";
marker.setOrientToAngle(angle);
console.log(marker.orientAngle.baseVal.value); // new value - 110
```
