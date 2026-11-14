---
title: "SVGCircleElement: r property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgcircleelement/r/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGCircleElement: r property

The **`r`** read-only property of the `SVGCircleElement` interface reflects the `r` attribute of a `<circle>` element and by that defines the radius of the circle.

If unspecified, the effect is as if the value is set to `0`.

## Value

An `SVGAnimatedLength` representing the radius of the circle.

## Examples

### SVG

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100"
  width="200"
  height="200">
  <circle r="50" fill="gold" id="circle" />
</svg>
```

### JavaScript

```js
const circle = document.getElementById("circle");
console.log(circle.r);
```

## See also

- `SVGCircleElement.cx`
- `SVGCircleElement.cy`
