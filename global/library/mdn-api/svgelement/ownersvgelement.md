---
title: "SVGElement: ownerSVGElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgelement/ownersvgelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGElement: ownerSVGElement property

The **`ownerSVGElement`** read-only property of the `SVGElement` interface reflects the nearest ancestor `` element. `null` if the given element is the outermost `` element.

## Value

An `SVGSVGElement`.

## Examples

### Checking the owner `` element

```html
<svg id="outerSvg" xmlns="http://www.w3.org/2000/svg">
  <g id="group1">
    <circle id="circle1" cx="50" cy="50" r="40" fill="blue" />
  </g>
</svg>
```

```js
const circle = document.getElementById("circle1");
const ownerSVG = circle.ownerSVGElement;

if (ownerSVG) {
  console.log(`The circle's owner <svg> has the ID: ${ownerSVG.id}`);
} else {
  console.log("This element is the outermost <svg>.");
}
```
