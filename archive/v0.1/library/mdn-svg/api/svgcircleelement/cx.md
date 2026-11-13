---
title: "SVGCircleElement: cx property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgcircleelement/cx/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGCircleElement: cx property

The **`cx`** read-only property of the `SVGCircleElement` interface reflects the `cx` attribute of a `<circle>` element and by that defines the x-coordinate of the circle's center.<

If unspecified, the effect is as if the value is set to `0`.

## Value

An `SVGAnimatedLength` representing the x-coordinate of the circle's center.

## Examples

### SVG

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100"
  width="200"
  height="200">
  <circle cx="50" cy="50" r="50" fill="gold" id="circle" />
</svg>
```

### JavaScript

```js
const circle = document.getElementById("circle");
console.log(circle.cx);
```

## See also

- `SVGCircleElement.cy`
- `SVGCircleElement.r`
