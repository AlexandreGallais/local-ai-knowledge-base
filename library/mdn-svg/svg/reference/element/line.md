---
title: "<line>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/element/line/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# <line>

The **`<line>`** SVG element is an SVG basic shape used to create a line connecting two points.

## Attributes

- `x1`
    Defines the x-axis coordinate of the line starting point.
    _Value type_: **\<length>** | **\<percentage>** | **\<number>**; _Default value_: `0`; _Animatable_: **yes**
- `x2`
    Defines the x-axis coordinate of the line ending point.
    _Value type_: **\<length>** | **\<percentage>** | **\<number>**; _Default value_: `0`; _Animatable_: **yes**
- `y1`
    Defines the y-axis coordinate of the line starting point.
    _Value type_: **\<length>** | **\<percentage>** | **\<number>**; _Default value_: `0`; _Animatable_: **yes**
- `y2`
    Defines the y-axis coordinate of the line ending point.
    _Value type_: **\<length>** | **\<percentage>** | **\<number>**; _Default value_: `0`; _Animatable_: **yes**
- `pathLength`
    Defines the total path length in user units.
    _Value type_: **\<number>**; _Default value_: _none_; _Animatable_: **yes**

## DOM Interface

This element implements the `SVGLineElement` interface.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="80" x2="100" y2="20" stroke="black" />

  <!-- If you do not specify the stroke
       color the line will not be visible -->
</svg>
```

## See also

- Other SVG basic <example-value>: `<circle>`, `<ellipse>`, `<polygon>`, **`<polyline>`**, `<rect>`
