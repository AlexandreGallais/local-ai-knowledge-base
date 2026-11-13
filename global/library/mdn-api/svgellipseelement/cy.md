---
title: "SVGEllipseElement: cy property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgellipseelement/cy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGEllipseElement: cy property

The **`cy`** read-only property of the `SVGEllipseElement` interface describes the y-axis coordinate of the center of the ellipse as an `SVGAnimatedLength`. It reflects the computed value of the `cy` attribute on the `<ellipse>` element.

The attribute value is a `<length>`, `<percentage>`, or `<number>`. The numeric value of the `SVGAnimatedLength.baseVal` is the y-coordinate of the ellipse's center in the user coordinate system.

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

We can access the computed values of the `cy` attributes:

```js
const ellipses = document.querySelectorAll("ellipse");
const cyPos0 = ellipses[0].cy;
const cyPos1 = ellipses[1].cy;

console.dir(cyPos0.baseVal.value); // output: 75
console.dir(cyPos1.baseVal.value); // output: 100 (50% of the viewBox height, 200)
```

## See also

- `SVGEllipseElement.cx`
- `SVGAnimatedLength.baseVal`
