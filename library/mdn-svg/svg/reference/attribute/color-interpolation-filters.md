---
title: "color-interpolation-filters"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/color-interpolation-filters/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# color-interpolation-filters

The **`color-interpolation-filters`** attribute specifies the color space for imaging operations performed via filter effects.

> **Note:**
> This property just has an effect on filter operations. Therefore, it has no effect on filter primitives like `<feOffset>`, `<feImage>`, `<feTile>` or `<feFlood>`.
>
> `color-interpolation-filters` has a different initial value than `color-interpolation`. `color-interpolation-filters` has an initial value of `linearRGB`, whereas `color-interpolation` has an initial value of `sRGB`. Thus, in the default case, filter effects operations occur in the linearRGB color space, whereas all other color interpolations occur by default in the sRGB color space.
>
> It has no effect on filter functions, which operate in the sRGB color space.

> **Note:**
> As a presentation attribute, `color-interpolation-filters` also has a CSS property counterpart: `color-interpolation-filters`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

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

## Usage notes

       | Value
       | `auto` | `sRGB` | `linearRGB`

       | Default value
       | `linearRGB`

       | Animatable
       | discrete

- `auto`
    Indicates that the user agent can choose either the `sRGB` or `linearRGB` spaces for color interpolation. This option indicates that the author doesn't require that color interpolation occur in a particular color space.
- `sRGB`
    Indicates that color interpolation should occur in the sRGB color space.
- `linearRGB`
    Indicates that color interpolation should occur in the linearized RGB color space as described in the sRGB specification.

## See also

- SVG `color-interpolation` attribute
- CSS `color-interpolation-filters` property
- sRGB specification
