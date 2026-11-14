---
title: "SVGEllipseElement: cx property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgellipseelement/cx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGEllipseElement: cx property

The **`cx`** read-only property of the `SVGEllipseElement` interface describes the x-axis coordinate of the center of the ellipse as an `SVGAnimatedLength`. It reflects the computed value of the `cx` attribute on the `<ellipse>` element.

The attribute value is a `<length>`, `<percentage>`, or `<number>`. The numeric value of the `SVGAnimatedLength.baseVal` is the x-coordinate of the ellipse's center in the user coordinate system.

## Value

An `SVGAnimatedLength`.

## Example

Given the following SVG:

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="50" cy="75" rx="30" ry="20" fill="blue" />
  <ellipse cx="25%" cy="50%" rx="10%" ry="5%" fill="red" />
</svg>
```

We can access the computed values of the `cx` attributes:

```js
const ellipses = document.querySelectorAll("ellipse");
const cxPos0 = ellipses[0].cx;
const cxPos1 = ellipses[1].cx;

console.dir(cxPos0.baseVal.value); // output: 50
console.dir(cxPos1.baseVal.value); // output: 50 (25% of 200)
```

## See also

- `SVGEllipseElement.cy`
- `SVGAnimatedLength.baseVal`
