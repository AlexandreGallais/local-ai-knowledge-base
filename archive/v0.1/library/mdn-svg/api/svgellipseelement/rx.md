---
title: "SVGEllipseElement: rx property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgellipseelement/rx/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGEllipseElement: rx property

The **`rx`** read-only property of the `SVGEllipseElement` interface describes the x-axis radius of the ellipse as an `SVGAnimatedLength`. It reflects the computed value of the `rx` attribute on the `<ellipse>` element.

The attribute value is a `<length>`, `<percentage>`, or `<number>`. The numeric value of the `SVGAnimatedLength.baseVal` is the radius of the ellipse along the x-axis in the user coordinate system.

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

We can access the computed values of the `rx` attributes:

```js
const ellipses = document.querySelectorAll("ellipse");
const rxPos0 = ellipses[0].rx;
const rxPos1 = ellipses[1].rx;

console.dir(rxPos0.baseVal.value); // output: 30
console.dir(rxPos1.baseVal.value); // output: 20 (10% of 200)
```

## See also

- `SVGEllipseElement.ry`
- `SVGAnimatedLength.baseVal`
