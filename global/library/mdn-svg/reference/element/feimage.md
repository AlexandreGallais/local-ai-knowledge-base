---
title: "<feImage>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/feimage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <feImage>

The **`<feImage>`** SVG filter primitive fetches image data from an external source and provides the pixel data as output (meaning if the external source is an SVG image, it is rasterized.)

## Attributes

- `crossorigin`
- `fetchpriority` (experimental) (non-standard)
- `preserveAspectRatio`
- `href`
- `xlink:href` (deprecated)
- Filter primitive attributes: `x`, `y`, `width`, `height`, `result`

## DOM Interface

This element implements the `SVGFEImageElement` interface.

## Example

### SVG

```html
<svg
  viewBox="0 0 200 200"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  width="200"
  height="200">
  <defs>
    <filter id="image">
      <feImage href="mdn_logo_only_color.png" />
    </filter>
  </defs>

  <rect x="10%" y="10%" width="80%" height="80%" filter="url(#image)" />
</svg>
```

## See also

- SVG Filter primitive attributes
- `flood-color` attribute
- `flood-opacity` attribute
- `<filter>`
- `<animate>`
- `<animateTransform>`
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
- `<feMerge>`
- `<feMorphology>`
- `<feOffset>`
- `<feSpecularLighting>`
- `<feTile>`
- `<feTurbulence>`
- `fetchpriority` attribute
- SVG tutorial: Filter effects
