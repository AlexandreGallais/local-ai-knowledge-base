---
title: "SVGPolylineElement: animatedPoints property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgpolylineelement/animatedpoints/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGPolylineElement: animatedPoints property

The **`animatedPoints`** read-only property of the `SVGPolylineElement` interface reflects the animated value of the element's `points` attribute. If the `points` attribute is not being animated, it contains the same value as the `points` property.

## Value

An `SVGPointList` object.

## Examples

### Accessing the `animatedPoints` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <polyline
    id="myPolyline"
    points="100,10 150,50 100,90 50,50"
    fill="none"
    stroke="blue"
    stroke-width="4">
    <animate
      attributeName="points"
      values="100,10 150,50 100,90 50,50; 150,10 200,50 150,90 100,50"
      dur="2s"
      repeatCount="indefinite" />
  </polyline>
</svg>
```

```js
const polylineElement = document.getElementById("myPolyline");

// Access the animatedPoints property
console.dir(polylineElement.animatedPoints); // Output: SVGPointList object
```
