---
title: "SVGElement: viewportElement property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgelement/viewportelement/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGElement: viewportElement property

The **`viewportElement`** read-only property of the `SVGElement` interface represents the `SVGElement` which established the current viewport. Often the nearest ancestor `` element. `null` if the given element is the outermost `` element.

## Value

An `SVGElement`.

## Examples

### Retrieving the `viewportElement`

```html
<svg id="outerSvg" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <svg id="innerSvg" x="10" y="10" width="100" height="100">
    <circle id="circle" cx="50" cy="50" r="40" fill="blue"></circle>
  </svg>
</svg>
```

```js
const circle = document.getElementById("circle");
const innerSvg = document.getElementById("innerSvg");
const outerSvg = document.getElementById("outerSvg");

console.log(circle.viewportElement); // Output: <svg id="innerSvg">...</svg>
console.log(innerSvg.viewportElement); // Output: <svg id="outerSvg">...</svg>
console.log(outerSvg.viewportElement); // Output: null
```

## See also

- `SVGElement.ownerSVGElement`: Retrieves the nearest ancestor `` element for the current SVG element.
