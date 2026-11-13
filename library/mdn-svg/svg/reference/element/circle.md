---
title: "<circle>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/element/circle/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# <circle>

The **`<circle>`** SVG element is an SVG basic shape, used to draw circles based on a center point and a radius.

## Attributes

- `cx`
    The x-axis coordinate of the center of the circle.
    _Value type_: **\<length>** | **\<percentage>**; _Default value_: `0`; _Animatable_: **yes**
- `cy`
    The y-axis coordinate of the center of the circle.
    _Value type_: **\<length>** | **\<percentage>**; _Default value_: `0`; _Animatable_: **yes**
- `r`
    The radius of the circle. A value lower or equal to zero disables rendering of the circle.
    _Value type_: **\<length>** | **\<percentage>**; _Default value_: `0`; _Animatable_: **yes**
- `pathLength`
    The total length for the circle's circumference, in user units.
    _Value type_: **\<number>**; _Default value_: _none_; _Animatable_: **yes**

> **Note:**
> Starting with SVG2, `cx`, `cy`, and `r` are _Geometry Properties_, meaning those attributes can also be used as CSS properties for that element.

## DOM Interface

This element implements the `SVGCircleElement` interface.

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
  <circle cx="50" cy="50" r="50" />
</svg>
```

## See also

- Other SVG basic shapes: **`<ellipse>`**, `<line>`, `<polygon>`, `<polyline>`, `<rect>`
