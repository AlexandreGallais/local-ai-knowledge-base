---
title: "SVGFEGaussianBlurElement: edgeMode property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfegaussianblurelement/edgemode/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFEGaussianBlurElement: edgeMode property

The **`edgeMode`** read-only property of the `SVGFEGaussianBlurElement` interface determines what color values to use when the blur needs to sample pixels beyond the edge of the input image. It reflects the `edgeMode` attribute of the given `<feGaussianBlur>` element.

Its value is one of the `SVG_EDGEMODE_*` constants defined on the `SVGFEGaussianBlurElement` interface.

## Value

An `SVGAnimatedEnumeration` object. The `baseVal` property of this object contains one of the following values:

- `0`
    Represents `SVG_EDGEMODE_UNKNOWN`, which means that the `edgeMode` attribute has a value other than the predefined keywords.
- `1`
    Represents `SVG_EDGEMODE_DUPLICATE`, which means that the input image is extended along each of its borders as necessary by duplicating the color values at the given edge of the input image.
- `2`
    Represents `SVG_EDGEMODE_WRAP`, which means that the input image is extended by taking the color values from the opposite edge of the image.
- `3`
    Represents `SVG_EDGEMODE_NONE`, which means that the input image is extended with pixel values of zero for the R, G, B, and A channels.

## Examples

### Accessing the `edgeMode` property

```html
<svg
  viewBox="0 0 200 200"
  width="300"
  height="300"
  xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="blur-filter">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
    </filter>
  </defs>
  <rect
    x="20"
    y="20"
    width="160"
    height="160"
    fill="rebeccapurple"
    filter="url(#blur-filter)" />
</svg>
<output></output>
```

```css
body {
  font-family: system-ui;
}

output {
  display: block;
  font: inherit;
  white-space: pre;
}
```

We can access the `edgeMode` property to read the current value:

```js
const gaussianBlur = document.querySelector("feGaussianBlur");
const log = document.querySelector("output");

if (gaussianBlur.edgeMode) {
  // Default edgeMode for feGaussianBlur is "none" (3)
  log.textContent = `edgeMode.baseVal: ${gaussianBlur.edgeMode.baseVal}`;
} else {
  log.textContent = "edgeMode is not supported in this browser";
}
```

## See also

- `edgeMode`
- `SVGFEConvolveMatrixElement.edgeMode`
