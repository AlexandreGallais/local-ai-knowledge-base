---
title: "<filter>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/element/filter/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# <filter>

The **`<filter>`** SVG element defines a custom filter effect by grouping atomic filter primitives. It is never rendered itself, but must be used by the `filter` attribute on SVG elements, or the `filter` CSS property for SVG/HTML elements.

## Attributes

- `x`
- `y`
- `width`
- `height`
- `filterUnits`
- `primitiveUnits`
- `xlink:href` (deprecated)

> **Note:**
> For `<filter>`, the `x` and `y` attributes default to `-10%`, and the `width` and `height` attributes default to `120%`. This is because many filter effects, such as `<feGaussianBlur>`, extend beyond the bounds of the element being filtered. The default sizing ensures that the filter effect is not clipped.

## DOM Interface

This element implements the `SVGFilterElement` interface.

## Examples

### Adding a blur effect

#### SVG

```html
<svg width="230" height="120" xmlns="http://www.w3.org/2000/svg">
  <filter id="blurMe">
    <feGaussianBlur stdDeviation="5" />
  </filter>

  <circle cx="60" cy="60" r="50" fill="green" />

  <circle cx="170" cy="60" r="50" fill="green" filter="url(#blurMe)" />
</svg>
```

#### Result

## See also

- `<feBlend>`
- `<feColorMatrix>`
- `<feComponentTransfer>`
- `<feComposite>`
- `<feConvolveMatrix>`
- `<feDiffuseLighting>`
- `<feDisplacementMap>`
- `<feDropShadow>`
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
