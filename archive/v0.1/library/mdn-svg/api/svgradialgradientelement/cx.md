---
title: "SVGRadialGradientElement: cx property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgradialgradientelement/cx/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGRadialGradientElement: cx property

The **`cx`** read-only property of the `SVGRadialGradientElement` interface describes the x-axis coordinate of the center of the radial gradient as an `SVGAnimatedLength`. It reflects the computed value of the `cx` attribute on the `<radialGradient>` element.

The attribute value is a `<length>`, `<percentage>`, or `<number>`. The numeric value of the `SVGAnimatedLength.baseVal` is the x-coordinate of the radial gradient's center in the user coordinate system.

## Value

An `SVGAnimatedLength`.

## Example

Given the following SVG:

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="gradient1" cx="50" cy="75" r="30">
      <stop offset="0%" stop-color="blue" />
      <stop offset="100%" stop-color="white" />
    </radialGradient>
    <radialGradient id="gradient2" cx="25%" cy="50%" r="10%">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="yellow" />
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="200" height="100" fill="url(#gradient1)" />
  <rect x="0" y="100" width="200" height="100" fill="url(#gradient2)" />
</svg>
```

We can access the computed values of the `cx` attributes:

```js
const radialGradients = document.querySelectorAll("radialGradient");
const cxGradient1 = radialGradients[0].cx;
const cxGradient2 = radialGradients[1].cx;

console.dir(cxGradient1.baseVal.value); // output: 50
console.dir(cxGradient2.baseVal.value); // output: 50 (25% of 200)
```

## See also

- `SVGRadialGradientElement.cy`
- `SVGAnimatedLength.baseVal`
