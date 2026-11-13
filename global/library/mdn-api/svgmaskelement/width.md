---
title: "SVGMaskElement: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgmaskelement/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGMaskElement: width property

The read-only **`width`** property of the `SVGMaskElement` interface returns an `SVGAnimatedLength` object containing the value of the `width` attribute of the `<mask>`.

> **Note:**
> Although this property is read-only, it is merely a container for two values you can modify, `baseVal` and `animVal`.

## Value

An `SVGAnimatedLength` object. The `baseVal` property of this object returns an `SVGLength`, the value of which returns the `width` value.

## Examples

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<div>
  <svg viewBox="-10 -10 120 120" width="100" height="100">
    <mask id="mask" x="0" maskUnits="objectBoundingBox">
      <!-- Everything under a white pixel will be visible -->
      <rect x="0" y="0" width="100" height="100" fill="white" />

      <!-- Everything under a black pixel will be invisible -->
      <path
        d="M10,35 A20,20,0,0,1,50,35 A20,20,0,0,1,90,35 Q90,65,50,95 Q10,65,10,35 Z"
        fill="black" />
      <animate
        attributeName="width"
        values="144;0;144"
        dur="5s"
        repeatCount="indefinite" />
    </mask>

    <polygon points="-10,110 110,110 110,-10" fill="orange" />

    <!-- with this mask applied, we "punch" a heart shape hole into the circle -->
    <circle cx="50" cy="50" r="50" mask="url(#mask)" />
  </svg>
</div>
<pre id="log"></pre>
```

```js
const mask = document.getElementById("mask");

function displayLog() {
  const animValue = mask.width.animVal.value;
  const baseValue = mask.width.baseVal.value;
  log.textContent = `The 'width.animVal' is ${animValue}.\n`;
  log.textContent += `The 'width.baseVal' is ${baseValue}.`;
  requestAnimationFrame(displayLog);
}
displayLog();
```
