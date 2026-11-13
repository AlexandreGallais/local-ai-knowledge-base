---
title: "`color-interpolation-filters` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/color-interpolation-filters/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `color-interpolation-filters` CSS property

The **`color-interpolation-filters`** CSS property specifies the color space for imaging operations performed via SVG filter effects. If explicitly declared, the value of the CSS property overrides any value given in the element's `color-interpolation-filters` attribute.

> **Note:**
> The `color-interpolation-filters` property is only relevant to SVG filter operations. It has _no_ effect on filter primitives like `<feOffset>`, `<feImage>`, `<feTile>`, and `<feFlood>`, but instead applies to the various filter effect elements (e.g., `<feBlend>`); see the SVG `color-interpolation-filters` page for a full list.

> **Note:**
> It is important to remember that the SVG `color-interpolation` attribute has an initial value of `sRGB`, while `color-interpolation-filters` has an initial value of `linearRGB`. This means, in the default case, filter effect interpolations occur in a different color space than all other color interpolations.

## Syntax

```css
color-interpolation-filters: auto;
color-interpolation-filters: linearRGB;
color-interpolation-filters: sRGB;

/* Global values */
color-interpolation-filters: inherit;
color-interpolation-filters: initial;
color-interpolation-filters: revert;
color-interpolation-filters: revert-layer;
color-interpolation-filters: unset;
```

### Values

This property is specified as one of the following keyword values:

- `linearRGB`
    Indicates that color interpolation should occur in the linearized RGB color space as described in the sRGB specification. This is the default property value.
- `sRGB`
    Indicates that color interpolation should occur in the gamma-encoded sRGB color space.
- `auto`
    Indicates that the user agent can choose either the `sRGB` or `linearRGB` spaces for color interpolation. This option indicates that the author doesn't require that color interpolation occur in a particular color space.

## See also

- `color-interpolation`
- SVG `color-interpolation-filters` attribute
- sRGB specification
