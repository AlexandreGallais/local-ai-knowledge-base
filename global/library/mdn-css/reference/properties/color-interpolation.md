---
title: "`color-interpolation` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/color-interpolation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `color-interpolation` CSS property

The `color-interpolation` CSS property is used in SVG to specify which color space to use for `<linearGradient>` and `<radialGradient>` SVG elements.

## Syntax

```css
/* Keyword values */
color-interpolation: auto;
color-interpolation: sRGB;
color-interpolation: linearRGB;
```

### Values

This property is specified as one of the following keyword values:

- `auto`
    Indicates that the user agent can choose either the `sRGB` or `linearRGB` spaces for color interpolation. This option indicates that the author doesn't require that color interpolation occur in a particular color space.
- `sRGB`
    Indicates that color interpolation should occur in the sRGB color space.
    Defaults to this initial value if no `color-interpolation` property is set.
- `linearRGB`
    Indicates that color interpolation should occur in the linearized RGB color space as described in the sRGB specification.

## Formal definition

       | Value
       | `auto` | `sRGB` | `linearRGB`

       | Applies to
       | `<linearGradient>` and `<radialGradient>`

       | Default value
       | `auto`

       | Animatable
       | discrete

## Example

In the first SVG, the `color-interpolation` property is not included on the `<linearGradient>` element and color interpolation defaults to `sRGB`.
The second example shows color interpolation using the `linearRGB` value.

```html
<svg width="450" height="70">
  <title>Example of using the color-interpolation CSS Property</title>
  <defs>
    <linearGradient id="sRGB">
      <stop offset="0%" stop-color="white" />
      <stop offset="25%" stop-color="blue" />
      <stop offset="50%" stop-color="white" />
      <stop offset="75%" stop-color="red" />
      <stop offset="100%" stop-color="white" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="400" height="40" fill="url(#sRGB)" stroke="black" />
  <text x="0" y="60" font-family="courier" font-size="16">
    no color-interpolation (CSS property)
  </text>
</svg>
```

```html
<svg width="450" height="70">
  <title>Example of using the color-interpolation CSS Property</title>
  <defs>
    <linearGradient id="linearRGB">
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
    fill="url(#linearRGB)"
    stroke="black" />
  <text x="0" y="60" font-family="courier" font-size="16">
    color-interpolation: linearRGB; (CSS property)
  </text>
</svg>
```

```css
svg {
  display: block;
}

#linearRGB {
  color-interpolation: linearRGB;
}
```

## See also

- `<linearGradient>`
- `<radialGradient>`
- SVG `color-interpolation` attribute
