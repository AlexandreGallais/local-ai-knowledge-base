---
title: "`x` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/x/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `x` CSS property

The **`x`** CSS property defines the x-axis coordinate of the top left corner of the SVG `<rect>` shape, `<image>` image, `<foreignObject>` viewport or nested `` viewport relative to the nearest `` ancestor's user coordinate system. If present, it overrides the element's `x` attribute.

> **Note:**
> The `x` property only applies to `<rect>`, `<image>`, `<foreignObject>`, and `` elements nested in an ``. It has no effect on the outermost `` elements itself, and does not apply to other SVG elements nor to HTML elements or pseudo-elements.

## Syntax

```css
/* length and percentage values */
x: 40px;
x: 40%;

/* Global values */
x: inherit;
x: initial;
x: revert;
x: revert-layer;
x: unset;
```

### Values

The `length` and `percentage` values denote the x-axis coordinate position of the top left corner of the SVG element container.

- `length`
    As an absolute or relative length, it can be expressed in any unit allowed by the CSS `<length>` data type.

- `percentage`
    Percentages refer to the width of the SVG `viewBox`, if declared, otherwise, the percentage refers to the width of the current SVG viewport.

## Examples

### Defining the x-axis coordinates of SVG shapes

This example demonstrates the basic use case of `x`, and how the CSS `x` property takes precedence over the `x` attribute.

#### HTML

We include four identical SVG `<rect>` elements; their `x` and `y` attributes values are all `10`, meaning the four rectangles are all in the same location, `10px` from the top and left corner of the SVG viewport.

```html
<svg xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" x="10" y="10" />
  <rect width="100" height="100" x="10" y="10" />
  <rect width="100" height="100" x="10" y="10" />
  <rect width="100" height="100" x="10" y="10" />
</svg>
```

#### CSS

We style all the rectangles to have a black border and be slightly transparent, so overlapping rectangles are visible. We provide each rectangle with different fill and `x` values.

```css
svg {
  border: 1px solid;
  width: 300px;
}

rect {
  fill: none;
  stroke: black;
  opacity: 0.8;
}

rect:nth-of-type(2) {
  x: 3em;
  fill: red;
}

rect:nth-of-type(3) {
  x: 180px;
  fill: yellow;
}

rect:nth-of-type(4) {
  x: 50%;
  fill: orange;
}
```

#### Results

The left edges of the rectangles are at `10` (from the attribute), `3em`, `180px`, and `50%`, respectively. The SVG is `300px` wide, so the last rectangle's left side is at the `150px` mark.

## See also

- SVG `x` attribute
- Geometry properties: `x`, `cx`, `cy`, `r`, `rx`, `ry`, `y`, `width`, `height`
- `fill`
- `stroke`
- `paint-order`
- `basic-shape` data type
