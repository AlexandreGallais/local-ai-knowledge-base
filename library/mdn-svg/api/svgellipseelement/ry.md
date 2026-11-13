---
title: "SVGEllipseElement: ry property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgellipseelement/ry/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGEllipseElement: ry property

The **`ry`** read-only property of the `SVGEllipseElement` interface describes the y-axis radius of the ellipse as an `SVGAnimatedLength`. It reflects the computed value of the `ry` attribute on the `<ellipse>` element.

The attribute value is a `<length>`, `<percentage>`, or `<number>`. The numeric value of the `SVGAnimatedLength.baseVal` is the radius of the ellipse along the y-axis in the user coordinate system.

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

We can access the computed values of the `ry` attributes:

```js
const ellipses = document.querySelectorAll("ellipse");
const ryPos0 = ellipses[0].ry;
const ryPos1 = ellipses[1].ry;

console.dir(ryPos0.baseVal.value); // output: 20
console.dir(ryPos1.baseVal.value); // output: 10 (5% of 200)
```

## See also

- `SVGEllipseElement.rx`
- `SVGAnimatedLength.baseVal`
