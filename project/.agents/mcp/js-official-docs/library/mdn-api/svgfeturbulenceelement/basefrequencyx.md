---
title: "SVGFETurbulenceElement: baseFrequencyX property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfeturbulenceelement/basefrequencyx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFETurbulenceElement: baseFrequencyX property

The **`baseFrequencyX`** read-only property of the `SVGFETurbulenceElement` interface reflects the X component of the `baseFrequency` attribute of the given `<feTurbulence>` element.

## Value

An `SVGAnimatedInteger` object.

## Examples

### Accessing the `baseFrequencyX` property

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="turbulenceFilter">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.5 0.25"
        numOctaves="4" />
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

// Access the baseFrequencyX property
console.log(turbulenceElement.baseFrequencyX.baseVal); // Output: 0.5
```
