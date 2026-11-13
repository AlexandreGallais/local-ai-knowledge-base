---
title: "<feComponentTransfer>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/fecomponenttransfer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <feComponentTransfer>

The **`<feComponentTransfer>`** SVG filter primitive performs color-component-wise remapping of data for each pixel. It allows operations like brightness adjustment, contrast adjustment, color balance or thresholding.

The calculations are performed on non-premultiplied color values. The colors are modified by changing each channel (R, G, B, and A) to the result of what the children `<feFuncR>`, `<feFuncB>`, `<feFuncG>`, and `<feFuncA>` return. If more than one of the same element is provided, the last one specified is used, and if no element is supplied to modify one of the channels, the effect is the same is if an identity transformation had been given for that channel.

Like other filter primitives, it handles color components in the `linearRGB` color space by default. You can use `color-interpolation-filters` to use `sRGB` instead.

## Attributes

- `in`
- Filter primitive attributes: `x`, `y`, `width`, `height`, `result`

## DOM Interface

This element implements the `SVGFEComponentTransferElement` interface.

## Example

### SVG

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300">
  <defs>
    <linearGradient
      id="rainbow"
      gradientUnits="userSpaceOnUse"
      x1="0"
      y1="0"
      x2="100%"
      y2="0">
      <stop offset="0" stop-color="red"></stop>
      <stop offset="0.2" stop-color="yellow"></stop>
      <stop offset="0.4" stop-color="lime"></stop>
      <stop offset="0.6" stop-color="cyan"></stop>
      <stop offset="0.8" stop-color="blue"></stop>
      <stop offset="1" stop-color="purple"></stop>
    </linearGradient>
    <filter id="identity" x="0" y="0" width="100%" height="100%">
      <feComponentTransfer>
        <feFuncR type="identity"></feFuncR>
        <feFuncG type="identity"></feFuncG>
        <feFuncB type="identity"></feFuncB>
        <feFuncA type="identity"></feFuncA>
      </feComponentTransfer>
    </filter>
    <filter id="table" x="0" y="0" width="100%" height="100%">
      <feComponentTransfer>
        <feFuncR type="table" tableValues="0 0 1 1"></feFuncR>
        <feFuncG type="table" tableValues="1 1 0 0"></feFuncG>
        <feFuncB type="table" tableValues="0 1 1 0"></feFuncB>
      </feComponentTransfer>
    </filter>
    <filter id="discrete" x="0" y="0" width="100%" height="100%">
      <feComponentTransfer>
        <feFuncR type="discrete" tableValues="0 0 1 1"></feFuncR>
        <feFuncG type="discrete" tableValues="1 1 0 0"></feFuncG>
        <feFuncB type="discrete" tableValues="0 1 1 0"></feFuncB>
      </feComponentTransfer>
    </filter>
    <filter id="linear" x="0" y="0" width="100%" height="100%">
      <feComponentTransfer>
        <feFuncR type="linear" slope="0.5" intercept="0"></feFuncR>
        <feFuncG type="linear" slope="0.5" intercept="0.25"></feFuncG>
        <feFuncB type="linear" slope="0.5" intercept="0.5"></feFuncB>
      </feComponentTransfer>
    </filter>
    <filter id="gamma" x="0" y="0" width="100%" height="100%">
      <feComponentTransfer>
        <feFuncR type="gamma" amplitude="4" exponent="7" offset="0"></feFuncR>
        <feFuncG type="gamma" amplitude="4" exponent="4" offset="0"></feFuncG>
        <feFuncB type="gamma" amplitude="4" exponent="1" offset="0"></feFuncB>
      </feComponentTransfer>
    </filter>
  </defs>
  <g font-weight="bold">
    <text x="0" y="20">Default</text>
    <rect x="0" y="30" width="100%" height="20"></rect>
    <text x="0" y="70">Identity</text>
    <rect x="0" y="80" width="100%" height="20" filter="url(#identity)"></rect>
    <text x="0" y="120">Table lookup</text>
    <rect x="0" y="130" width="100%" height="20" filter="url(#table)"></rect>
    <text x="0" y="170">Discrete table lookup</text>
    <rect x="0" y="180" width="100%" height="20" filter="url(#discrete)"></rect>
    <text x="0" y="220">Linear function</text>
    <rect x="0" y="230" width="100%" height="20" filter="url(#linear)"></rect>
    <text x="0" y="270">Gamma function</text>
    <rect x="0" y="280" width="100%" height="20" filter="url(#gamma)"></rect>
  </g>
</svg>
```

### CSS

```css
rect {
  fill: url("#rainbow");
}
```

## See also

- SVG filter primitive attributes
- `<filter>`
- `<feBlend>`
- `<feColorMatrix>`
- `<feComposite>`
- `<feConvolveMatrix>`
- `<feDiffuseLighting>`
- `<feDisplacementMap>`
- `<feFlood>`
- `<feFuncA>`
- `<feFuncB>`
- `<feFuncG>`
- `<feFuncR>`
- `<feGaussianBlur>`
- `<feImage>`
- `<feMerge>`
- `<feMorphology>`
- `<feOffset>`
- `<feSpecularLighting>`
- `<feTile>`
- `<feTurbulence>`
- SVG tutorial: Filter effects
