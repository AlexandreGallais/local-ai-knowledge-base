---
title: "SVGPolylineElement: points property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgpolylineelement/points/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGPolylineElement: points property

The **`points`** read-only property of the `SVGPolylineElement` interface reflects the base (i.e., static) value of the element's `points` attribute. Modifications via the `SVGPointList` object are reflected in the `points` attribute, and vice versa.

## Value

An `SVGPointList` object.

## Examples

### Accessing the `points` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <polyline
    id="myPolyline"
    points="100,10 150,50 100,90 50,50"
    fill="none"
    stroke="blue"
    stroke-width="4" />
</svg>
```

```js
const polylineElement = document.getElementById("myPolyline");

// Access the points property
console.dir(polylineElement.points); // Output: SVGPointList object containing points (100,10), (150,50), (100,90), (50,50)
```
