---
title: "pathLength"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/pathlength/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# pathLength

The **`pathLength`** attribute lets authors specify a total length for the path, in user units. This value is then used to calibrate the browser's distance calculations with those of the author, by scaling all distance computations using the ratio `pathLength` / (_computed value of path length_).

This can affect the actual rendered lengths of paths; including text paths, animation paths, and various stroke operations. Basically, all computations that require the length of the path. `stroke-dasharray`, for example, will assume the start of the path being 0 and the end point the value defined in the `pathLength` attribute.

You can use this attribute with the following SVG elements:

- `<circle>`
- `<ellipse>`
- `<line>`
- ``
- `<polygon>`
- `<polyline>`
- `<rect>`

> **Note:**
> The `pathLength` attribute also has a CSS property counterpart: `path-length`. When both are specified, the CSS property takes priority.

## circle

For `<circle>`, `pathLength` lets authors specify a total length for the circle, in user units.

       | Value
       |
        &#x3C;number>

       | Default value
       | none

       | Animatable
       | Yes

## ellipse

For `<ellipse>`, `pathLength` lets authors specify a total length for the ellipse, in user units.

       | Value
       |
        &#x3C;number>

       | Default value
       | none

       | Animatable
       | Yes

## line

For `<line>`, `pathLength` lets authors specify a total length for the line, in user units.

       | Value
       |
        &#x3C;number>

       | Default value
       | none

       | Animatable
       | Yes

## path

For ``, `pathLength` lets authors specify a total length for the path, in user units.

       | Value
       |
        &#x3C;number>

       | Default value
       | none

       | Animatable
       | Yes

## polygon

For `<polygon>`, `pathLength` lets authors specify a total length for the shape, in user units.

       | Value
       |
        &#x3C;number>

       | Default value
       | none

       | Animatable
       | Yes

## polyline

For `<polyline>`, `pathLength` lets authors specify a total length for the shape, in user units.

       | Value
       |
        &#x3C;number>

       | Default value
       | none

       | Animatable
       | Yes

## rect

For `<rect>`, `pathLength` lets authors specify a total length for the rectangle, in user units.

       | Value
       |
        &#x3C;number>

       | Default value
       | none

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
<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
  <style>
    path {
      fill: none;
      stroke: black;
      stroke-width: 2;
      stroke-dasharray: 10;
    }
  </style>

  <!-- No pathLength, the real length of the path is used. In that case, 100 user units -->
  <path d="M 0,10 h100" />

  <!-- compute everything like if the path length was 90 user units long -->
  <path d="M 0,20 h100" pathLength="90" />

  <!-- compute everything like if the path length was 50 user units long -->
  <path d="M 0,30 h100" pathLength="50" />

  <!-- compute everything like if the path length was 30 user units long -->
  <path d="M 0,40 h100" pathLength="30" />

  <!-- compute everything like if the path length was 10 user units long -->
  <path d="M 0,50 h100" pathLength="10" />
</svg>
```

## See also

- CSS `path-length` property
