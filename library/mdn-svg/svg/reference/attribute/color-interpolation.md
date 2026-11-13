---
title: "color-interpolation"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/color-interpolation/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# color-interpolation

The **`color-interpolation`** attribute specifies the color space for gradient interpolations, color animations, and alpha compositing.

> **Note:**
> For filter effects, the `color-interpolation-filters` property controls which color space is used.

The `color-interpolation` property chooses between color operations occurring in the sRGB color space or in a (light energy linear) linearized RGB color space. Having chosen the appropriate color space, component-wise linear interpolation is used.

When a child element is blended into a background, the value of the `color-interpolation` property on the child determines the type of blending, not the value of the `color-interpolation` on the parent. For gradients which make use of the `href` or the deprecated `xlink:href` attribute to reference another gradient, the gradient uses the property's value from the gradient element which is directly referenced by the `fill` or `stroke` property. When animating colors, color interpolation is performed according to the value of the `color-interpolation` property on the element being animated.

> **Note:**
> As a presentation attribute, `color-interpolation` also has a CSS property counterpart: `color-interpolation`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- ``
- `<animate>`
- `<circle>`
- `<clipPath>`
- `<defs>`
- `<ellipse>`
- `<foreignObject>`
- ``
- `<image>`
- `<line>`
- `<linearGradient>`
- `<marker>`
- `<mask>`
- ``
- `<pattern>`
- `<polygon>`
- `<polyline>`
- `<radialGradient>`
- `<rect>`
- ``
- `<switch>`
- `<symbol>`
- `<text>`
- `<textPath>`
- `<tspan>`
- `<use>`

## Example

This example shows four SVGs, each with a `<rect>` element and a different gradient used as a fill for the `<rect>`. The first two SVGs use `<linearGradient>` and the second two use `<radialGradient>` elements. In unsupported browsers, the gradient looks the same.

In this first SVG, the `color-interpolation` attribute is not included on the `<linearGradient>` element, which defaults to `sRGB`.

```css
svg {
  display: block;
}
```

```html
<svg width="450" height="70">
  <title>
    Example of linearGradient excluding the color-interpolation attribute
  </title>
  <defs>
    <linearGradient id="gradientDefault">
      <stop offset="0%" stop-color="white" />
      <stop offset="25%" stop-color="blue" />
      <stop offset="50%" stop-color="white" />
      <stop offset="75%" stop-color="red" />
      <stop offset="100%" stop-color="white" />
    </linearGradient>
  </defs>
  <rect
    x="0"
    y="0"
    width="400"
    height="40"
    fill="url(#gradientDefault)"
    stroke="black" />
  <text x="0" y="60" font-family="courier" font-size="16">
    color-interpolation not set
  </text>
</svg>
```

In this second SVG, the `color-interpolation` attribute is included on the `<linearGradient>` element and set to `linearRGB`.

```html
<svg width="450" height="70">
  <title>
    Example of linearGradient using the color-interpolation attribute
  </title>
  <defs>
    <linearGradient id="gradientLinearRGB" color-interpolation="linearRGB">
      <stop offset="0%" stop-color="white" />
      <stop offset="25%" stop-color="blue" />
      <stop offset="50%" stop-color="white" />
      <stop offset="75%" stop-color="red" />
      <stop offset="100%" stop-color="white" />
    </linearGradient>
  </defs>
  <rect
    x="0"
    y="0"
    width="400"
    height="40"
    fill="url(#gradientLinearRGB)"
    stroke="black" />
  <text x="0" y="60" font-family="courier" font-size="16">
    color-interpolation="linearRGB"
  </text>
</svg>
```

In this third SVG, the `color-interpolation` attribute is not included on the `<radialGradient>` element, which defaults to `sRGB`.

```html
<svg width="450" height="70">
  <title>
    Example of radialGradient excluding the color-interpolation attribute
  </title>
  <defs>
    <radialGradient id="none">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="gold" />
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="400" height="40" fill="url(#none)" stroke="black" />
  <text x="0" y="60" font-family="courier" font-size="16">
    color-interpolation not set
  </text>
</svg>
```

In this fourth SVG, the `color-interpolation` attribute is included on the `<radialGradient>` element and set to `linearRGB`.

```html
<svg width="450" height="70">
  <title>
    Example of radialGradient using the color-interpolation attribute
  </title>
  <defs>
    <radialGradient id="radLinearRGB" color-interpolation="linearRGB">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="gold" />
    </radialGradient>
  </defs>
  <rect
    x="0"
    y="0"
    width="400"
    height="40"
    fill="url(#radLinearRGB)"
    stroke="black" />
  <text x="0" y="60" font-family="courier" font-size="16">
    color-interpolation="linearRGB" (SVG attr)
  </text>
</svg>
```

## Usage notes

       | Value
       | `auto` | `sRGB` | `linearRGB`

       | Default value
       | `sRGB`

       | Animatable
       | discrete

- `auto`
    Indicates that the user agent can choose either the `sRGB` or `linearRGB` spaces for color interpolation. This option indicates that the author doesn't require that color interpolation occur in a particular color space.
- `sRGB`
    Indicates that color interpolation should occur in the sRGB color space.
- `linearRGB`
    Indicates that color interpolation should occur in the linearized RGB color space as described in the sRGB specification.

## See also

- `<linearGradient>`
- `<radialGradient>`
- CSS `color-interpolation` property
- sRGB specification
- `color-interpolation-filters`
- Computer color is broken - popular demonstration of linearRGB
