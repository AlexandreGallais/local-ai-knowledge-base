---
title: "cx"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/cx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# cx

The **`cx`** attribute defines the x-axis coordinate of a center point.

You can use this attribute with the following SVG elements:

- `<circle>`
- `<ellipse>`
- `<radialGradient>`

> **Note:**
> As a _geometry property_, `cx` can also be used as CSS property for `<circle>` and `<ellipse>`.

## circle

For `<circle>`, `cx` defines the x-axis coordinate of the center of the shape.

       | Value
       | `length-percentage`

       | Default value
       | `0`

       | Animatable
       | Yes

> **Note:**
> The x-axis coordinate of the center of the `<circle>` can also be defined with the `cx` _geometry property_. If set in CSS, the `cx` property value overrides the `cx` attribute value.

## ellipse

For `<ellipse>`, `cx` defines the x-axis coordinate of the center of the shape.

       | Value
       | `length-percentage`

       | Default value
       | `0`

       | Animatable
       | Yes

> **Note:**
> The x-axis coordinate of the center of the `<ellipse>` can also be defined with the `cx` _geometry property_. If set in CSS, the `cx` property value overrides the `cx` attribute value.

## radialGradient

For `<radialGradient>`, `cx` defines the x-axis coordinate of the end circle for the radial gradient.

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
<svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
  <radialGradient cx="25%" id="myGradient">
    <stop offset="0" stop-color="white" />
    <stop offset="100%" stop-color="black" />
  </radialGradient>

  <circle cx="50" cy="50" r="45" />
  <ellipse cx="150" cy="50" rx="45" ry="25" />
  <rect x="205" y="5" width="90" height="90" fill="url(#myGradient)" />
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
    <radialGradient cx="0" id="myGradient000">
      <stop offset="0%" stop-color="gold" />
      <stop offset="50%" stop-color="green" />
      <stop offset="100%" stop-color="white" />
    </radialGradient>

    <radialGradient cx="50%" id="myGradient050">
      <stop offset="0%" stop-color="gold" />
      <stop offset="50%" stop-color="green" />
      <stop offset="100%" stop-color="white" />
    </radialGradient>

    <radialGradient cx="100%" id="myGradient100">
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

- `cy`
- `r`
- `rx`
- `ry`
- Geometry properties: `cx`, `cy`, `r`, `rx`, `ry`, `x`, `y`, `width`, `height`
