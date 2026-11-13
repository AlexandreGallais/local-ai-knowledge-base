---
title: "<stop>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/element/stop/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# <stop>

The **`<stop>`** SVG element defines a color and its position to use on a gradient. This element is always a child of a `<linearGradient>` or `<radialGradient>` element.

## Attributes

- `offset`
    This attribute defines where the gradient stop is placed along the gradient vector.
    _Value type_: **\<number>** | **\<percentage>**; _Default value_: `0`; _Animatable_: **yes**
- `stop-color`
    This attribute defines the color of the gradient stop. It can be used as a CSS property.
    _Value type_: **\<color>**; _Default value_: `black`; _Animatable_: **yes**
- `stop-opacity`
    This attribute defines the opacity of the gradient stop. It can be used as a CSS property.
    _Value type_: **\<opacity-value>**; _Default value_: `1`; _Animatable_: **yes**

## DOM Interface

This element implements the `SVGStopElement` interface.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg
  viewBox="0 0 10 10"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="myGradient" gradientTransform="rotate(90)">
      <stop offset="5%" stop-color="gold" />
      <stop offset="95%" stop-color="red" />
    </linearGradient>
  </defs>

  <!-- using my linear gradient -->
  <circle cx="5" cy="5" r="4" fill="url('#myGradient')" />
</svg>
```
