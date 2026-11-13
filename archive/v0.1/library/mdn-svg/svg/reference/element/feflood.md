---
title: "<feFlood>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/element/feflood/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# <feFlood>

The **`<feFlood>`** SVG filter primitive fills the filter subregion with the color and opacity defined by `flood-color` and `flood-opacity`.

## Attributes

- `flood-color`
- `flood-opacity`
- Filter primitive attributes: `x`, `y`, `width`, `height`, `result`

## DOM Interface

This element implements the `SVGFEFloodElement` interface.

## Example

### HTML

```html
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <defs>
    <filter id="floodFilter" filterUnits="userSpaceOnUse">
      <feFlood
        x="50"
        y="50"
        width="100"
        height="100"
        flood-color="green"
        flood-opacity="0.5" />
    </filter>
  </defs>

  <use filter="url(#floodFilter)" />
</svg>
```

## See also

- SVG Filter primitive attributes
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
- `<feGaussianBlur>`
- `<feImage>`
- `<feMerge>`
- `<feMorphology>`
- `<feOffset>`
- `<feSpecularLighting>`
- `<feTile>`
- `<feTurbulence>`
- SVG tutorial: Filter effects
