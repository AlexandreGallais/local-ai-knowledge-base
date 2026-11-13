---
title: "zoomAndPan"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/zoomandpan/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# zoomAndPan

The **`zoomAndPan`** attribute specifies whether the SVG document can be magnified and panned.

Magnification in this context means the effect of a supplemental scale and translate transformation on the outermost SVG document fragment.

Panning represents a translation (i.e., a shift) transformation on an SVG document fragment in response to a user interface action.

You can use this attribute with the following SVG elements:

- ``
- `<view>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg
  viewBox="0 0 200 200"
  xmlns="http://www.w3.org/2000/svg"
  zoomAndPan="disable">
  <filter id="diffuseLighting" x="0" y="0" width="100%" height="100%">
    <feDiffuseLighting in="SourceGraphic" zoomAndPan="1">
      <fePointLight x="60" y="60" z="20" />
    </feDiffuseLighting>
  </filter>

  <rect x="0" y="0" width="200" height="200" filter="url(#diffuseLighting)" />
</svg>
```

## Usage notes

       | Value
       | `disable` | `magnify`

       | Default value
       | `magnify`

       | Animatable
       | No
