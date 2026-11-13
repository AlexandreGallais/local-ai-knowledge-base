---
title: "SVGElement: ownerSVGElement property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgelement/ownersvgelement/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
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
