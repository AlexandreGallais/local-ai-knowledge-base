---
title: "SVGAnimatedLength: animVal property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimatedlength/animval/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedLength: animVal property

The **`animVal`** property of the `SVGAnimatedLength` interface contains the current value of an SVG enumeration. If there is no animation, it is the same value as the `baseVal`.

## Value

An `SVGLength` containing the current value of the enumeration.

## Examples

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100"
  width="200"
  height="200">
  <circle cx="50" cy="50" r="20" fill="gold" id="circle">
    <animate
      attributeName="r"
      values="20;25;10;20"
      dur="8s"
      repeatCount="indefinite" />
  </circle>
</svg>
<pre id="log"></pre>
```

```js
const circle = document.getElementById("circle");
const log = document.getElementById("log");

function displayLog() {
  const animValue = circle.r.animVal.value;
  const baseValue = circle.r.baseVal.value;
  log.textContent = `The 'circle.r.animVal' is ${animValue}.\n`;
  log.textContent += `The 'circle.r.baseVal' is ${baseValue}.`;
  requestAnimationFrame(displayLog);
}
displayLog();
```

## See also

- `SVGAnimatedLength.baseVal`
