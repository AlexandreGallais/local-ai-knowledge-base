---
title: "SVGMarkerElement: viewBox property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgmarkerelement/viewbox/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGMarkerElement: viewBox property

The **`viewBox`** read-only property of the `SVGMarkerElement` interface returns an `SVGAnimatedRect` object which contains the values set by the `viewBox` attribute on the `<marker>`.

## Value

An `SVGAnimatedRect` object. The `baseVal` property of this object returns an `SVGRect` object, from which can be returned the `x` and `y` co-ordinates, plus the `width` and `height` of the `<marker>` `viewBox` attribute.

## Examples

This example demonstrates how to return the value of the `width` set for the `viewBox` attribute of `<marker>`.

```html
<svg id="svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker
      id="arrow"
      viewBox="0 0 10 10"
      refX="5"
      refY="5"
      preserveAspectRatio="xMidYMid meet"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
  </defs>
</svg>
```

```js
const marker = document.getElementById("arrow");
console.log(marker.viewBox.baseVal.width); // 10
```
