---
title: "SVGRadialGradientElement: fx property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgradialgradientelement/fx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGRadialGradientElement: fx property

The **`fx`** read-only property of the `SVGRadialGradientElement` interface describes the x-axis coordinate of the focal point of the radial gradient as an `SVGAnimatedLength`. It reflects the computed value of the `fx` attribute on the `<radialGradient>` element.

The attribute value is a `<length>`, `<percentage>`, or `<number>`. The numeric value of the `SVGAnimatedLength.baseVal` is the x-coordinate of the focal point of the radial gradient in the user coordinate system.

## Value

An `SVGAnimatedLength`.

## Example

Given the following SVG:

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="gradient1" cx="50" cy="75" fx="30" fy="60" r="30">
      <stop offset="0%" stop-color="blue" />
      <stop offset="100%" stop-color="white" />
    </radialGradient>
    <radialGradient id="gradient2" cx="25%" cy="50%" fx="10%" fy="40%" r="10%">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="yellow" />
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="200" height="100" fill="url(#gradient1)" />
  <rect x="0" y="100" width="200" height="100" fill="url(#gradient2)" />
</svg>
```

We can access the computed values of the `fx` attributes:

```js
const radialGradients = document.querySelectorAll("radialGradient");
const fxGradient1 = radialGradients[0].fx;
const fxGradient2 = radialGradients[1].fx;

console.dir(fxGradient1.baseVal.value); // output: 30
console.dir(fxGradient2.baseVal.value); // output: 20 (10% of 200)
```

## See also

- `SVGRadialGradientElement.fy`
- `SVGAnimatedLength.baseVal`
