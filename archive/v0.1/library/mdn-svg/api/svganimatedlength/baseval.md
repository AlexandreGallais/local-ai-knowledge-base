---
title: "SVGAnimatedLength: baseVal property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimatedlength/baseval/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedLength: baseVal property

The **`baseVal`** property of the `SVGAnimatedLength` interface contains the initial value of an SVG enumeration.

## Value

An `SVGLength` containing the initial value of the length.

## Examples

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100"
  width="200"
  height="200">
  <circle cx="50" cy="50" r="20px" fill="gold" id="circle"></circle>
</svg>
<pre id="log"></pre>
```

```js
const unit = [
  "unknown",
  "",
  "%",
  "em",
  "ex",
  "px",
  "cm",
  "mm",
  "in",
  "pt",
  "pc",
];
const circle = document.getElementById("circle");
const log = document.getElementById("log");
const baseValue = circle.r.baseVal.value;
const baseUnit = unit[circle.r.baseVal.unitType];

log.textContent = `The 'circle.r.baseVal' is ${baseValue} (in ${baseUnit}).`;
```

## See also

- `SVGAnimatedLength.animVal`
