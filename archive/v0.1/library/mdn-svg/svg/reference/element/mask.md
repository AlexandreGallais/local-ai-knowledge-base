---
title: "<mask>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/element/mask/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# <mask>

The **`<mask>`** SVG element defines a mask for compositing the current object into the background. A mask is used/referenced using the `mask` property and CSS `mask-image` property.

## Attributes

- `height`
    This attribute defines the height of the masking area.
    _Value type_: **\<length>**; _Default value_: `120%`; _Animatable_: **yes**
- `mask-type`
    This attribute defines the mask mode for the contents of the `<mask>`.
    _Value type_: `alpha` | `luminance`; _Default value_: `luminance`; _Animatable_: **yes**
- `maskContentUnits`
    This attribute defines the coordinate system for the contents of the `<mask>`.
    _Value type_: `userSpaceOnUse` | `objectBoundingBox`; _Default value_: `userSpaceOnUse`; _Animatable_: **yes**
- `maskUnits`
    This attribute defines the coordinate system for attributes `x`, `y`, `width` and `height` on the `<mask>`.
    _Value type_: `userSpaceOnUse` | `objectBoundingBox`; _Default value_: `objectBoundingBox`; _Animatable_: **yes**
- `x`
    This attribute defines the x-axis coordinate of the top-left corner of the masking area.
    _Value type_: **\<coordinate>**; _Default value_: `-10%`; _Animatable_: **yes**
- `y`
    This attribute defines the y-axis coordinate of the top-left corner of the masking area.
    _Value type_: **\<coordinate>**; _Default value_: `-10%`; _Animatable_: **yes**
- `width`
    This attribute defines the width of the masking area.
    _Value type_: **\<length>**; _Default value_: `120%`; _Animatable_: **yes**

## DOM Interface

This element implements the `SVGMaskElement` interface.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="-10 -10 120 120">
  <rect x="-10" y="-10" width="120" height="120" fill="blue" />
  <mask id="myMask" mask-type="luminance">
    <!-- Everything under a white pixel will be visible -->
    <rect x="0" y="0" width="100" height="100" fill="white" />

    <!-- Everything under a black pixel will be invisible -->
    <path
      d="M10,35 A20,20,0,0,1,50,35 A20,20,0,0,1,90,35 Q90,65,50,95 Q10,65,10,35 Z"
      fill="black" />
  </mask>

  <polygon points="-10,110 110,110 110,-10" fill="orange" />

  <!-- with this mask applied, we "punch" a heart shape hole into the circle -->
  <circle cx="50" cy="50" r="50" fill="purple" mask="url(#myMask)" />
</svg>
```

## See also

- CSS `mask-type` property
- Other clipping and masking SVG elements: `<clipPath>`
- Clipping and masking CSS properties: `mask`, `mask-image`, `mask-mode`, `mask-repeat`, `mask-position`, `mask-clip`, `mask-origin`, `mask-composite`, `mask-size`
