---
title: "paint-order"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/paint-order/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# paint-order

The **`paint-order`** attribute specifies the order that the fill, stroke, and markers of a given shape or text element are painted.

> **Note:**
> As a presentation attribute, `paint-order` also has a CSS property counterpart: `paint-order`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<circle>`
- `<ellipse>`
- `<line>`
- ``
- `<polygon>`
- `<polyline>`
- `<rect>`
- `<text>`
- `<textPath>`
- `<tspan>`

## Example

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop stop-color="#888888" />
    <stop stop-color="#cccccc" offset="1" />
  </linearGradient>
  <rect width="400" height="200" fill="url(#g)" />
  <g
    fill="crimson"
    stroke="white"
    stroke-width="6"
    stroke-linejoin="round"
    text-anchor="middle"
    font-family="sans-serif"
    font-size="50px"
    font-weight="bold">
    <text x="200" y="75">stroke over</text>
    <text x="200" y="150" paint-order="stroke" id="stroke-under">
      stroke under
    </text>
  </g>
</svg>
```

The example would be rendered as follows:

The stroke under effect could be achieved via the following CSS property:

```css
#stroke-under {
  paint-order: stroke;
}
```

## Usage notes

       | Value
       |
        `normal` | [ `fill` || `stroke` ||
        `markers` ]

       | Default value
       | `normal`

       | Animatable
       | discrete

- normal
    This value indicates that the fill will be painted first, then the stroke, and finally the markers.
- \[ fill || stroke || markers ]
    The order of these three keywords indicates the order in which the painting happens, from left to right. If any of the three painting components is omitted, they will be painted in their default order after the specified components. For example, using `stroke` is equivalent to `stroke fill markers`.
