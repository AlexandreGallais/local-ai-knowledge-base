---
title: "SVGMarkerElement: setOrientToAuto() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgmarkerelement/setorienttoauto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGMarkerElement: setOrientToAuto() method

The **`setOrientToAuto()`** method of the `SVGMarkerElement` interface sets the value of the `orient` attribute to `auto`.

## Syntax

```js
setOrientToAuto()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

In the following example the value of the `orient` attribute is updated using `setOrientToAuto()`.

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
let marker = document.getElementById("arrow");
console.log(marker.orientAngle.baseVal.value);
marker.setOrientToAuto();
console.log(marker.orientAngle.baseVal.value);
```
