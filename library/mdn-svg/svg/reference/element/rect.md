---
title: "<rect>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/element/rect/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# <rect>

The **`<rect>`** SVG element is a basic SVG shape that draws rectangles, defined by their position, width, and height. The rectangles may have their corners rounded.

## Attributes

- `x`
    The x coordinate of the rect.
    _Value type_: **\<length>** | **\<percentage>**; _Default value_: `0`; _Animatable_: **yes**
- `y`
    The y coordinate of the rect.
    _Value type_: **\<length>** | **\<percentage>**; _Default value_: `0`; _Animatable_: **yes**
- `width`
    The width of the rect.
    _Value type_: `auto` | **\<length>** | **\<percentage>**; _Default value_: `auto`; _Animatable_: **yes**
- `height`
    The height of the rect.
    _Value type_: `auto` | **\<length>** | **\<percentage>**; _Default value_: `auto`; _Animatable_: **yes**
- `rx`
    The horizontal corner radius of the rect. Defaults to `ry` if it is specified.
    _Value type_: `auto` | **\<length>** | **\<percentage>**; _Default value_: `auto`; _Animatable_: **yes**
- `ry`
    The vertical corner radius of the rect. Defaults to `rx` if it is specified.
    _Value type_: `auto` | **\<length>** | **\<percentage>**; _Default value_: `auto`; _Animatable_: **yes**
- `pathLength`
    The total length of the rectangle's perimeter, in user units.
    _Value type_: **\<number>**; _Default value_: _none_; _Animatable_: **yes**

> **Note:**
> Starting with SVG2, `x`, `y`, `width`, `height`, `rx` and `ry` are _Geometry Properties_, meaning those attributes can also be used as CSS properties for that element.

## DOM Interface

This element implements the `SVGRectElement` interface.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Regular rectangle -->
  <rect width="100" height="100" />

  <!-- Rounded corner rectangle -->
  <rect x="120" width="100" height="100" rx="15" />
</svg>
```

## See also

- SVG presentation attributes including `fill` and `stroke`
- Other basic SVG shapes: `<circle>`, `<ellipse>`, `<line>`, **`<polygon>`**, `<polyline>`
