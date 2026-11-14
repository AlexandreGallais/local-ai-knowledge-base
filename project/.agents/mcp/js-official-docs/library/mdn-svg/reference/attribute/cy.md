---
title: "cy"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/cy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# cy

The **`cy`** attribute defines the y-axis coordinate of a center point.

You can use this attribute with the following SVG elements:

- `<circle>`
- `<ellipse>`
- `<radialGradient>`

> **Note:**
> As a _geometry property_, `cy` can also be used as CSS property for `<circle>` and `<ellipse>`.

## circle

For `<circle>`, `cy` defines the y-axis coordinate of the center of the shape.

       | Value
       | `length-percentage`

       | Default value
       | `0`

       | Animatable
       | Yes

> **Note:**
> The y-axis coordinate of the center of the `<circle>` can also be defined with the `cy` _geometry property_. If set in CSS, the `cy` property value overrides the `cy` attribute value.

## ellipse

For `<ellipse>`, `cy` defines the y-axis coordinate of the center of the shape.

       | Value
       | `length-percentage`

       | Default value
       | `0`

       | Animatable
       | Yes

> **Note:**
> The y-axis coordinate of the center of the `<ellipse>` can also be defined with the `cy` _geometry property_. If set in CSS, the `cy` property value overrides the `cy` attribute value.

## radialGradient

For `<radialGradient>`, `cy` defines the y-axis coordinate of the end circle for the radial gradient.

       | Value
       |
        &#x3C;length>

       | Default value
       | `50%`

       | Animatable
       | Yes

## Examples

### Usage with various elements

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 100 300" xmlns="http://www.w3.org/2000/svg">
  <radialGradient cy="25%" id="myGradient">
    <stop offset="0" stop-color="white" />
    <stop offset="100%" stop-color="black" />
  </radialGradient>

  <circle cy="50" cx="50" r="45" />
  <ellipse cy="150" cx="50" rx="45" ry="25" />
  <rect x="5" y="205" width="90" height="90" fill="url(#myGradient)" />
</svg>
```

### Usage with radialGradient

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 34 10" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient cy="0" id="myGradient000">
      <stop offset="0%" stop-color="gold" />
      <stop offset="50%" stop-color="green" />
      <stop offset="100%" stop-color="white" />
    </radialGradient>

    <radialGradient cy="50%" id="myGradient050">
      <stop offset="0%" stop-color="gold" />
      <stop offset="50%" stop-color="green" />
      <stop offset="100%" stop-color="white" />
    </radialGradient>

    <radialGradient cy="100%" id="myGradient100">
      <stop offset="0%" stop-color="gold" />
      <stop offset="50%" stop-color="green" />
      <stop offset="100%" stop-color="white" />
    </radialGradient>
  </defs>

  <rect
    x="1"
    y="1"
    width="8"
    height="8"
    fill="url(#myGradient000)"
    stroke="black" />
  <rect
    x="13"
    y="1"
    width="8"
    height="8"
    fill="url(#myGradient050)"
    stroke="black" />
  <rect
    x="25"
    y="1"
    width="8"
    height="8"
    fill="url(#myGradient100)"
    stroke="black" />
</svg>
```

## See also

- `cx`
- `r`
- `rx`
- `ry`
- Geometry properties: `cx`, `cy`, `r`, `rx`, `ry`, `x`, `y`, `width`, `height`
