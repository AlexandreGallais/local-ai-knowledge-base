---
title: "<polygon>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/element/polygon/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# <polygon>

The **`<polygon>`** SVG element defines a closed shape consisting of a set of connected straight line segments. The last point is connected to the first point.

For open shapes, see the `<polyline>` element.

## Attributes

- `points`
    This attribute defines the list of points (pairs of `x,y` absolute coordinates) required to draw the polygon.
    _Value type_: **\<number>**+; _Default value_: `""`; _Animatable_: **yes**
- `pathLength`
    This attribute lets specify the total length for the path, in user units.
    _Value type_: **\<number>**; _Default value_: _none_; _Animatable_: **yes**

## DOM Interface

This element implements the `SVGPolygonElement` interface.

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
  <!-- Example of a polygon with the default fill -->
  <polygon points="0,100 50,25 50,75 100,0" />

  <!-- Example of the same polygon shape with stroke and no fill -->
  <polygon points="100,100 150,25 150,75 200,0" fill="none" stroke="black" />
</svg>
```

## See also

- SVG presentation attributes including `fill` and `stroke`

- **Other SVG basic shapes:**
  - `<circle>`
  - `<ellipse>`
  - `<line>`
  - `<polyline>`
  - `<rect>`
