---
title: "<feTile>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/fetile/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <feTile>

The **`<feTile>`** SVG filter primitive allows you to fill a target rectangle with a repeated, tiled pattern of an input image. The effect is similar to the one of a `<pattern>`.

## Attributes

- `in`
- Filter primitive attributes: `x`, `y`, `width`, `height`, `result`

## DOM Interface

This element implements the `SVGFETileElement` interface.

## Example

### SVG

```html
<svg
  width="200"
  height="200"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>
    Tiling an MDN logo with the Mozilla mascot's head that is on the logo
  </title>
  <defs>
    <!-- Define the region of the filter to be the bounding box of the
         MDN logo being filtered. These parameters will create an output
         that covers the same region as the image. -->
    <filter id="tile" x="0" y="0" width="100%" height="100%">
      <!-- Create a tile from the central portion of the image from
           (50,50) to (150,150). This area is essentially the Mozilla
           mascot's head. -->
      <feTile in="SourceGraphic" x="50" y="50" width="100" height="100" />

      <!-- Without specifying a region, feTile defaults to the region
           of the filter. Without specifying an "in" parameter, the default
           is the result of the previous primitive. So this second feTile
           will tile the entire filter region with the mascot's head. -->
      <feTile />
    </filter>
  </defs>

  <!-- Use the MDN logo as input to the filter -->
  <image
    href="mdn_logo_only_color.png"
    x="10%"
    y="10%"
    width="80%"
    height="80%"
    filter="url(#tile)" />
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
- `<feOffset>`
- `<feSpecularLighting>`
- `<feTurbulence>`
- SVG tutorial: Filter effects
