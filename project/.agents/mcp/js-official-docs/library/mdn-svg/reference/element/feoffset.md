---
title: "<feOffset>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/feoffset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <feOffset>

The **`<feOffset>`** SVG filter primitive enables offsetting an input image relative to its current position. The input image as a whole is offset by the values specified in the `dx` and `dy` attributes.

## Attributes

- `in`
- `dx`
- `dy`
- Filter primitive attributes: `x`, `y`, `width`, `height`, `result`

## DOM Interface

This element implements the `SVGFEOffsetElement` interface.

## Example

### SVG

```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="offset" width="180" height="180" filterUnits="userSpaceOnUse">
      <feOffset in="SourceGraphic" dx="60" dy="60" />
    </filter>
  </defs>

  <rect x="0" y="0" width="100" height="100" stroke="black" fill="green" />
  <rect
    x="0"
    y="0"
    width="100"
    height="100"
    stroke="black"
    fill="green"
    filter="url(#offset)" />
</svg>
```

## See also

- `<filter>`
- `<animate>`
- `<set>`
- `<feBlend>`
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
- `<feSpecularLighting>`
- `<feTile>`
- `<feTurbulence>`
- SVG tutorial: Filter effects
