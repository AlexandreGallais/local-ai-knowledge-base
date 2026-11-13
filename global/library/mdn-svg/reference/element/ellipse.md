---
title: "<ellipse>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/ellipse/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <ellipse>

The **`<ellipse>`** SVG element is an SVG basic shape, used to create ellipses based on a center coordinate, and both their x and y radius.

> **Note:**
> Ellipses are unable to specify the exact orientation of the ellipse (if, for example, you wanted to draw an ellipse tilted at a 45 degree angle), but it can be rotated by using the `transform` attribute.

## Attributes

- `cx`
    The x position of the center of the ellipse.
    _Value type_: **\<length>** | **\<percentage>**; _Default value_: `0`; _Animatable_: **yes**
- `cy`
    The y position of the center of the ellipse.
    _Value type_: **\<length>** | **\<percentage>**; _Default value_: `0`; _Animatable_: **yes**
- `rx`
    The radius of the ellipse on the x axis.
    _Value type_: `auto` | **\<length>** | **\<percentage>**; _Default value_: `auto`; _Animatable_: **yes**
- `ry`
    The radius of the ellipse on the y axis.
    _Value type_: `auto` | **\<length>** | **\<percentage>**; _Default value_: `auto`; _Animatable_: **yes**
- `pathLength`
    This attribute lets specify the total length for the path, in user units.
    _Value type_: **\<number>**; _Default value_: _none_; _Animatable_: **yes**

> **Note:**
> Starting with SVG2 `cx`, `cy`, `rx` and `ry` are _Geometry Properties_, meaning those attributes can also be used as CSS properties for that element.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="50" rx="100" ry="50" />
</svg>
```

## See also

- Other SVG basic <example-value>: **`<circle>`**, `<line>`, `<polygon>`, `<polyline>`, `<rect>`
