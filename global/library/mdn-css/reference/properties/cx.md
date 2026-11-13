---
title: "`cx` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/cx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `cx` CSS property

The **`cx`** CSS property defines the x-axis center point of an SVG `<circle>` or `<ellipse>` element. If present, it overrides the element's `cx` attribute.

> **Note:**
> While SVG the `cx` attribute is relevant to the SVG `<radialGradient>` element, the `cx` property only applies to `<circle>` and `<ellipse>` elements nested in an ``. It doesn't apply to `<radialGradient>` or other SVG elements nor to HTML elements or pseudo-elements.

## Syntax

```css
/* length and percentage values */
cx: 20px;
cx: 20%;

/* Global values */
cx: inherit;
cx: initial;
cx: revert;
cx: revert-layer;
cx: unset;
```

### Values

The `length` and `percentage` values denote the horizontal center of the circle or ellipse.

- `length`
    As an absolute or relative length, it can be expressed in any unit allowed by the CSS `<length>` data type. Negative values are invalid.

- `percentage`
    Percentages refer to the width of the current SVG viewport.

## Examples

### Defining the x-axis coordinate of a circle and ellipse

This example demonstrates the basic use case of `cx`, and how the CSS `cx` property takes precedence over the `cx` attribute.

#### HTML

We include two identical `<circle>` and two identical `<ellipse>` elements in an SVG; their `cx` attribute values are `50` and `150`, respectively.

```html
<svg xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="30" />
  <circle cx="50" cy="50" r="30" />
  <ellipse cx="150" cy="50" rx="20" ry="40" />
  <ellipse cx="150" cy="50" rx="20" ry="40" />
</svg>
```

#### CSS

With CSS, we style only the first circle and first ellipse, allowing their twin shapes to use default styles (with `fill` defaulting to black). We use the `cx` property to override the value of the SVG `cx` attribute and also give it a `fill` and `stroke` to differentiate the first shapes in each pair from their twin. The browser renders SVG images as `300px` wide and `150px` tall by default.

```css
svg {
  border: 1px solid;
}

circle:first-of-type {
  cx: 30px;
  fill: lightgreen;
  stroke: black;
}
ellipse:first-of-type {
  cx: 180px;
  fill: pink;
  stroke: black;
}
```

#### Results

The style circle's center is `30px` from the left edge of the SVG viewport and the styled ellipse is `180px` from that edge, as defined in the CSS `cx` property values. The unstyled shapes centers are `50px` and `150px` from the left edge of the SVG viewport, as defined in their SVG `cx` attribute values.

### x-axis coordinates as percentage values

This example demonstrates using percentage values for `cx`.

#### HTML

We use the same markup as the previous example.

```html
<svg xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="30" />
  <circle cx="50" cy="50" r="30" />
  <ellipse cx="150" cy="50" rx="20" ry="40" />
  <ellipse cx="150" cy="50" rx="20" ry="40" />
</svg>
```

#### CSS

We use CSS which is similar to the previous example. The only difference is the CSS `cx` property value; in this case, we use percentage values of `30%` for the `<circle>` and `80%` for the `<ellipse>`.

```css
svg {
  border: 1px solid;
}

circle:first-of-type {
  cx: 30%;
  fill: lightgreen;
  stroke: black;
}
ellipse:first-of-type {
  cx: 80%;
  fill: pink;
  stroke: black;
}
```

#### Results

When using percentage values for `cx`, the values are relative to the width of the SVG viewport. Here, the x-axis coordinates of the center of the style circle and ellipse are `30%` and `80%`, respectively, of the width of the current SVG viewport. As the width defaulted to `300px`, the `cx` values are `90px` and `240px` from the SVG viewport's left edge.

## See also

- SVG `cx` attribute
- Geometry properties: `cx`, `cy`, `r`, `rx`, `ry`, `x`, `y`, `width`, `height`
- `fill`
- `stroke`
- `paint-order`
- `border-radius` shorthand property
- `radial-gradient`
- `basic-shape` data type
