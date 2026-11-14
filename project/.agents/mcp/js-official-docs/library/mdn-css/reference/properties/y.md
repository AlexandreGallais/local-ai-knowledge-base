---
title: "`y` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/y/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `y` CSS property

The **`y`** CSS property defines the y-axis coordinate of the top left corner of the SVG `<rect>` shape, `<image>` image, `<foreignObject>` viewport and nested `` viewport relative to the nearest `` ancestor's user coordinate system. If present, it overrides the element's `y` attribute.

> **Note:**
> The `y` property only applies to `<rect>`, `<image>`, `<foreignObject>`, and `` elements nested in an ``. It has no effect on outermost `` elements and does not apply to other SVG elements nor to HTML elements or pseudo-elements.

## Syntax

```css
/* length and percentage values */
y: 10px;
y: 10%;

/* Global values */
y: inherit;
y: initial;
y: revert;
y: revert-layer;
y: unset;
```

### Values

The `length` and `percentage` values denote the y-axis coordinate position of the top left corner of the SVG element.

- `length`
    As an absolute or relative length, it can be expressed in any unit allowed by the CSS `<length>` data type.

- `percentage`
    Percentages refer to the height of the SVG `viewBox`, if declared, otherwise, the percentage refers to the height of the current SVG viewport.

## Examples

### Defining the y-axis coordinates of SVG shapes

This example demonstrates the basic use case of `y`, and how the CSS `y` property takes precedence over the `y` attribute.

#### HTML

We include four identical SVG `<rect>` elements; their `x` and `y` attributes values are all `10`, meaning the four rectangles are all in the same location, `10px` from the top and left corner of the SVG viewport.

```html
<svg>
  <rect width="40" height="40" x="10" y="10" />
  <rect width="40" height="40" x="10" y="10" />
  <rect width="40" height="40" x="10" y="10" />
  <rect width="40" height="40" x="10" y="10" />
</svg>
```

#### CSS

We style all the rectangles to have a black border and be slightly transparent, so overlapping rectangles are visible. We provide the rectangle with different `fill` and `y` values.

```css
svg {
  border: 1px solid;
}

rect {
  fill: none;
  stroke: black;
  opacity: 0.8;
}

rect:nth-of-type(2) {
  y: -20px;
  fill: red;
}

rect:nth-of-type(3) {
  y: 4em;
  fill: yellow;
}

rect:nth-of-type(4) {
  y: 60%;
  fill: orange;
}
```

#### Results

The top edges of the rectangles are at `10` (from the attribute), `-20px`, `4em`, and `60%`, respectively. The rectangle is `40px` tall, so the `-20px` places half the red rectangle outside the viewport. The SVG is `150px` tall, so the orange rectangle's top side is `90px` from the top of the SVG viewport.

## See also

- SVG `y` attribute
- Geometry properties: `y`, `cx`, `cy`, `r`, `rx`, `ry`, `x`, `width`, `height`
- `fill`
- `stroke`
- `paint-order`
- `basic-shape` data type
