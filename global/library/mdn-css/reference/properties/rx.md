---
title: "`rx` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/rx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `rx` CSS property

The **`rx`** CSS property defines the x-axis, or horizontal, radius of an SVG `<ellipse>` and the horizontal curve of the corners of an SVG `<rect>` rectangle. If present, it overrides the shape's `rx` attribute.

> **Note:**
> The `rx` property only applies to `<ellipse>` and `<rect>` elements nested in an ``. It doesn't apply to other SVG elements or HTML elements or pseudo-elements.

## Syntax

```css
/* Initial value */
rx: auto;

/* Length and percentage values */
rx: 20px;
rx: 20%;

/* Global values */
rx: inherit;
rx: initial;
rx: revert;
rx: revert-layer;
rx: unset;
```

### Values

The `length`, `percentage`, or `auto` keyword value denotes the horizontal radius of ellipses and the horizontal border-radius of rectangles.

- `length`
    Absolute or relative lengths can be expressed in any unit allowed by the CSS `<length>` data type. Negative values are invalid.

- `percentage`
    Percentages refer to the width of the current SVG viewport. The used value for a `<rect>` is never more than 50% of the width of the rectangle.

- `auto`
    When set or defaulting to `auto`, the `rx` value equals the absolute length value used for `ry`. If both `rx` and `ry` have a computed value of `auto`, the used value is `0`.

## Examples

### Creating rounded corners

This example demonstrates creating rectangles with rounded corners by applying the `rx` property to SVG `<rect>` elements.

#### HTML

We include an SVG image with five `<rect>` elements; all the rectangles are the same except for their `x` attribute value, which positions them along the x-axis.

```html
<svg xmlns="http://www.w3.org/2000/svg">
  <rect width="50" height="120" y="5" x="5" />
  <rect width="50" height="120" y="5" x="60" />
  <rect width="50" height="120" y="5" x="115" />
  <rect width="50" height="120" y="5" x="170" />
  <rect width="50" height="120" y="5" x="225" />
</svg>
```

#### CSS

With CSS, we set an `rx` value on four of the rectangles:

```css
svg {
  border: 1px solid;
}

rect:nth-of-type(2) {
  rx: 10px;
  fill: red;
}

rect:nth-of-type(3) {
  rx: 2em;
  fill: blue;
}

rect:nth-of-type(4) {
  rx: 5%;
  fill: orange;
}

rect:nth-of-type(5) {
  rx: 80%;
  fill: green;
}
```

#### Results

The first rectangle defaults to `auto`; as all the `ry` values in this example also default to `auto`, the used value of `rx` is `0`. The red and blue rectangles have `10px` and `2em` rounded corners, respectively. As the SVG viewport defaults to 300px by 150px, the orange rectangle's `5%` value creates a `15px` radius. The green rectangle has `rx: 80%` set. However, as the value of `rx` is never more than `50%` of the width of the rectangle, the effect is as if `rx: 50%; ry: 50%` was set.

### Defining the horizontal radius of an ellipse

This basic `<ellipse>` example demonstrates the CSS `rx` property taking precedence over an SVG `rx` attribute to define the shape's horizontal radius.

#### HTML

We include two identical `<ellipse>` elements in an SVG; each with the `rx` attribute set to `20`.

```html
<svg xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="80" cy="50" rx="20" ry="40" />
  <ellipse cx="80" cy="50" rx="20" ry="40" />
</svg>
```

#### CSS

We only style the first ellipse, letting its twin use default user agent styles (with `fill` defaulting to black). The geometric `rx` property overrides the value of the SVG `rx` attribute. We also set the `fill` and `stroke` properties to differentiate the styled shape from its twin.

```css
svg {
  border: 1px solid;
}

ellipse:first-of-type {
  rx: 80px;
  fill: magenta;
  stroke: rebeccapurple;
}
```

#### Results

The styled ellipse's horizontal radius is `80px`, as defined in the CSS `rx` property value. The unstyled ellipse's horizontal radius is `20px`, which was defined by the `rx` attribute.

### Ellipse horizontal radius percentage values

This example demonstrates using percentage values for `rx`.

#### HTML

We use the same markup as the previous example.

```html
<svg xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="80" cy="50" rx="20" ry="40" />
  <ellipse cx="80" cy="50" rx="20" ry="40" />
</svg>
```

#### CSS

The CSS is similar to the previous example, with the only difference being the `rx` property value; in this case, we use a percentage value.

```css
svg {
  border: 1px solid;
}

ellipse:first-of-type {
  rx: 30%;
  fill: magenta;
  stroke: rebeccapurple;
}
```

#### Results

When using percentage values for `rx`, the values are relative to the width of the SVG viewport. Here, the size of the styled ellipse horizontal radius is `30%` of the width of the current SVG viewport. As the width defaulted to `300px`, the `rx` value is `90px`.

## See also

- Geometry properties: `rx`, `cx`, `cy`, `r`, `ry`, `x`, `y`, `width`, `height`
- `fill`
- `stroke`
- `paint-order`
- `border-radius` shorthand property
- `radial-gradient`
- `basic-shape` data type
- SVG `rx` attribute
