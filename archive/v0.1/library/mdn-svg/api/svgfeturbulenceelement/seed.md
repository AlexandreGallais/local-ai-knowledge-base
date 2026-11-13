---
title: "SVGFETurbulenceElement: seed property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfeturbulenceelement/seed/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFETurbulenceElement: seed property

The **`seed`** read-only property of the `SVGFETurbulenceElement` interface reflects the `seed` attribute of the given `<feTurbulence>` element.

It sets a numeric seed for the random generation of the fractal noise or turbulence effect.

## Value

An `SVGAnimatedNumber` object.

## Examples

### Accessing the `seed` property

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="turbulenceFilter">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.05"
        numOctaves="3"
        seed="1234" />
    </filter>
  </defs>

  <rect
    x="20"
    y="20"
    width="160"
    height="160"
    fill="lightblue"
    filter="url(#turbulenceFilter)" />
</svg>
```

```js
// Select the feTurbulence element
const turbulenceElement = document.querySelector("feTurbulence");

// Access the seed property
console.log(turbulenceElement.seed.baseVal); // Output: 1234
```
