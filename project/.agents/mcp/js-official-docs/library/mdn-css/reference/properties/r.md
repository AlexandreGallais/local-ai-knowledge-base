---
title: "`r` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/r/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `r` CSS property

The **`r`** CSS property defines the radius of a circle. It can only be used with the SVG `<circle>` element. If present, it overrides the circle's `r` attribute.

> **Note:**
> The `r` property only applies to `<circle>` elements nested in an ``. It doesn't apply to other SVG elements or HTML elements or pseudo-elements.

## Syntax

```css
/* Length and percentage values */
r: 3px;
r: 20%;

/* Global values */
r: inherit;
r: initial;
r: revert;
r: revert-layer;
r: unset;
```

### Values

The `length` and `percentage` values define the radius of the circle.

- `length`
    Absolute or relative lengths can be expressed in any unit allowed by the CSS `<length>` data type. Negative values are invalid.

- `percentage`
    Percentages refer to the normalized diagonal of the current SVG viewport, which is calculated as <math><mfrac><msqrt><mrow><msup><mi><width></mi><mn>2</mn></msup><mo>+</mo><msup><mi><height></mi><mn>2</mn></msup></mrow></msqrt><msqrt><mn>2</mn></msqrt></mfrac></math>.

## Examples

### Defining the radius of a circle

In this example, we have two identical `<circle>` elements in an SVG, each with a `10` radius and the same x- and y-axis coordinates for their center points.

```html
<svg xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="10" />
  <circle cx="50" cy="50" r="10" />
</svg>
```

With CSS, we style only the first circle, allowing the second circle to use default styles (with `fill` defaulting to black). We use the `r` property to override the value of the SVG `r` attribute, giving it a `fill` and `stroke`. The default size of an SVG is `300px` wide and `150px` tall.

```css
svg {
  border: 1px solid black;
}

circle:first-of-type {
  r: 30px;
  fill: lightgreen;
  stroke: black;
}
```

### ViewBox versus viewport pixels

This example contains two SVGs, each with two `<circle>` elements. The second SVG includes a `viewBox` attribute to demonstrate the difference between SVG viewBox and SVG viewports.

```html
<svg xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="10" />
  <circle cx="50" cy="50" r="10" />
</svg>
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="10" />
  <circle cx="50" cy="50" r="10" />
</svg>
```

The CSS is similar to the previous example, with `r: 30px` set, but we set a `width` to ensure the images are both `300px` wide:

```css
svg {
  border: 1px solid black;
  width: 300px;
}

circle:first-of-type {
  r: 30px;
  fill: lightgreen;
  stroke: black;
}
```

Because the `viewBox` attribute defines the SVG as 200 SVG coordinate system pixels wide, and the image is scaled up to `300px`, the `30` SVG coordinate pixels are scaled to be rendered as `45` CSS pixels.

### Defining the radius of a circle using percentages

In this example, we use the same markup as the previous example. The only difference is the `r` value; in this case, we use a percentage value.

```html
<svg xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="10" />
  <circle cx="50" cy="50" r="10" />
</svg>
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="10" />
  <circle cx="50" cy="50" r="10" />
</svg>
```

```css
svg {
  border: 1px solid black;
  width: 300px;
}

circle:first-of-type {
  r: 30%;
  fill: lightgreen;
  stroke: black;
}
```

In both cases, the circle radius is `30%` of the normalized diagonal of the SVG viewport. The radius `r` is equal to <math><mn>0.3</mn><mo>&#xd7;</mo><mfrac><msqrt><mrow><msup><mi><width></mi><mn>2</mn></msup><mo>+</mo><msup><mi><height></mi><mn>2</mn></msup></mrow></msqrt><msqrt><mn>2</mn></msqrt></mfrac></math>. While the first image is using `300` and `150` CSS pixels and the second is using `200` and `100` SVG view box units, 30% is a proportional value. As a result, the `r` value is the same: `47.43` viewBox units, which resolves to `71.15` CSS pixels.

While the `r` is the same, the center points differ because the second SVG is scaled up by 50%, pushing its center down and to the right by 50%.

## See also

- Geometry properties: `r`, `cx`, `cy`, `rx`, `ry`, `x`, `y`, `width`, `height`
- `fill`
- `stroke`
- `paint-order`
- `border-radius` shorthand property
- `radial-gradient`
- `basic-shape` data type
- SVG `r` attribute
