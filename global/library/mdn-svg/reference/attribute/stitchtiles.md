---
title: "stitchTiles"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/stitchtiles/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# stitchTiles

The **`stitchTiles`** attribute defines how the Perlin Noise tiles behave at the border.

You can use this attribute with the following SVG elements:

- `<feTurbulence>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="noise1" x="0" y="0" width="100%" height="100%">
    <feTurbulence baseFrequency="0.025" stitchTiles="noStitch" />
  </filter>
  <filter id="noise2" x="0" y="0" width="100%" height="100%">
    <feTurbulence baseFrequency="0.025" stitchTiles="stitch" />
  </filter>

  <rect x="0" y="0" width="100" height="100" filter="url(#noise1)" />
  <rect x="100" y="0" width="100" height="100" filter="url(#noise1)" />
  <rect x="0" y="100" width="100" height="100" filter="url(#noise1)" />
  <rect x="100" y="100" width="100" height="100" filter="url(#noise1)" />

  <rect x="220" y="0" width="100" height="100" filter="url(#noise2)" />
  <rect x="320" y="0" width="100" height="100" filter="url(#noise2)" />
  <rect x="220" y="100" width="100" height="100" filter="url(#noise2)" />
  <rect x="320" y="100" width="100" height="100" filter="url(#noise2)" />
</svg>
```

## Usage notes

       | Value
       | `noStitch` | `stitch`

       | Default value
       | `noStitch`

       | Animatable
       | Yes

- `noStitch`
    This value indicates that no attempt is made to achieve smooth transitions at the border of tiles which contain a turbulence function. Sometimes the result will show clear discontinuities at the tile borders.
- `stitch`
    This value indicates that the user agent will automatically adjust the x and y values of the base frequency such that the `<feTurbulence>` node's width and height (i.e., the width and height of the current subregion) contain an integral number of the tile width and height for the first octave.
