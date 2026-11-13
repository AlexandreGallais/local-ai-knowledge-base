---
title: "<feBlend>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/feblend/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <feBlend>

The **`<feBlend>`** SVG filter primitive composes two objects together ruled by a certain blending mode. This is similar to what is known from image editing software when blending two layers. The mode is defined by the `mode` attribute.

Like other filter primitives, it handles color components in the `linearRGB` color space by default. You can use `color-interpolation-filters` to use `sRGB` instead.

## Attributes

- `in`
- `in2`
- `mode`
- Filter primitive attributes: `x`, `y`, `width`, `height`, `result`

## DOM Interface

This element implements the `SVGFEBlendElement` interface.

## Example

### SVG

```html
<svg
  width="200"
  height="200"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <filter id="spotlight">
      <feFlood
        result="floodFill"
        x="0"
        y="0"
        width="100%"
        height="100%"
        flood-color="green"
        flood-opacity="1" />
      <feBlend in="SourceGraphic" in2="floodFill" mode="multiply" />
    </filter>
  </defs>

  <image
    href="mdn_logo_only_color.png"
    x="10%"
    y="10%"
    width="80%"
    height="80%"
    filter="url(#spotlight)" />
</svg>
```

## See also

- SVG filter primitive attributes
- `<filter>`
- `<animate>`
- `<set>`
- `<feColorMatrix>`
- `<feComponentTransfer>`
- `<feComposite>`
- `<feConvolveMatrix>`
- `<feDiffuseLighting>`
- `<feDisplacementMap>`
- `<feFlood>`
- `<feGaussianBlur>`
- `<feImage>`
- `<feMerge>`
- `<feMorphology>`
- `<feOffset>`
- `<feSpecularLighting>`
- `<feTile>`
- `<feTurbulence>`
- SVG tutorial: Filter effects
