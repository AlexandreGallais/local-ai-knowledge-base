---
title: "SVGMarkerElement: refX property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgmarkerelement/refx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGMarkerElement: refX property

The **`refX`** read-only property of the `SVGMarkerElement` interface returns an `SVGAnimatedLength` object containing the value of the `refX` attribute of the `<marker>`.

## Value

An `SVGAnimatedLength` object. The `baseVal` property of this object returns an `SVGLength`, the value of which returns the `refX`.

## Examples

The `markerWidth` property returns an `SVGAnimatedLength` which contains an `SVGLength` with the value of the `refX` attribute.

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
console.log(marker.refX.baseVal.value); // 5
```
