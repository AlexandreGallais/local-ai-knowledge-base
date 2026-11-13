---
title: "r"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/r/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# r

The **`r`** attribute defines the radius of a circle.

You can use this attribute with the following SVG elements:

- `<circle>`
- `<radialGradient>`

Percentages refer to the normalized diagonal of the current SVG viewport, which is calculated as <math><mfrac><msqrt><mrow><msup><mi><width></mi><mn>2</mn></msup><mo>+</mo><msup><mi><height></mi><mn>2</mn></msup></mrow></msqrt><msqrt><mn>2</mn></msqrt></mfrac></math>.

## circle

For `<circle>`, `r` defines the radius of the circle and therefore its size. With a value lower or equal to zero the circle won't be drawn at all.

       | Value
       |
        &#x3C;length>
        |
        &#x3C;percentage>

       | Default value
       | `0`

       | Animatable
       | Yes

> **Note:**
> The radius size of a `<circle>` can also be defined with the `r` _geometry property_.

## radialGradient

For `<radialGradient>`, `r` defines the radius of the end circle for the radial gradient.

The gradient will be drawn such that the **100%** gradient stop is mapped to the perimeter of this end circle. A value of lower or equal to zero will cause the area to be painted as a single color using the color and opacity of the last gradient `<stop>`.

       | Value
       |
        &#x3C;length>

       | Default value
       | `50%`

       | Animatable
       | Yes

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
  <radialGradient r="0" id="myGradient000">
    <stop offset="0" stop-color="white" />
    <stop offset="100%" stop-color="black" />
  </radialGradient>
  <radialGradient r="50%" id="myGradient050">
    <stop offset="0" stop-color="white" />
    <stop offset="100%" stop-color="black" />
  </radialGradient>
  <radialGradient r="100%" id="myGradient100">
    <stop offset="0" stop-color="white" />
    <stop offset="100%" stop-color="black" />
  </radialGradient>

  <circle cx="50" cy="50" r="0" />
  <circle cx="150" cy="50" r="25" />
  <circle cx="250" cy="50" r="50" />

  <rect x="20" y="120" width="60" height="60" fill="url(#myGradient000)" />
  <rect x="120" y="120" width="60" height="60" fill="url(#myGradient050)" />
  <rect x="220" y="120" width="60" height="60" fill="url(#myGradient100)" />
</svg>
```

## See also

- CSS `r` property
