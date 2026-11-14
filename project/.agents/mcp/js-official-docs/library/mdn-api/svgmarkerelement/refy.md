---
title: "SVGMarkerElement: refY property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgmarkerelement/refy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGMarkerElement: refY property

The **`refY`** read-only property of the `SVGMarkerElement` interface returns an `SVGAnimatedLength` object containing the value of the `refY` attribute of the `<marker>`.

## Value

An `SVGAnimatedLength` object. The `baseVal` property of this object returns an `SVGLength`, the value of which returns the `refY`.

## Examples

The `markerWidth` property returns an `SVGAnimatedLength` which contains an `SVGLength` with the value of the `refY` attribute.

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
console.log(marker.refY.baseVal.value); // 5
```
