---
title: "`stroke-width` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/stroke-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `stroke-width` CSS property

The **`stroke-width`** CSS property defines the width of a stroke applied to the SVG shape. If present, it overrides the element's `stroke-width` attribute.

This property applies to any SVG shape or text-content element (see `stroke-width` for a full list), but as an inherited property, it may be applied to elements such as `` and still have the intended effect on descendant elements' strokes. If the value evaluates to zero, the stroke is not drawn.

## Syntax

```css
/* Length and percentage values */
stroke-width: 0%;
stroke-width: 1.414px;

/* Global values */
stroke-width: inherit;
stroke-width: initial;
stroke-width: revert;
stroke-width: revert-layer;
stroke-width: unset;
```

### Values

- `<length>`
    Pixel units are handled the same as SVG units (see `<number>`, above) and font-based lengths such as `em` are calculated with respect to the element's SVG value for the text size; the effects of other length units may depend on the browser.

- `<percentage>`
    Percentages refer to the normalized diagonal of the current SVG viewport, which is calculated as <math><mfrac><msqrt><mrow><msup><mi><width></mi><mn>2</mn></msup><mo>+</mo><msup><mi><height></mi><mn>2</mn></msup></mrow></msqrt><msqrt><mn>2</mn></msqrt></mfrac></math>.

- `<number>` (non-standard)
    A number of SVG units, the size of which defined by the current unit space.

## Examples

### Various stroke widths

This example demonstrates various value syntaxes for the `stroke-width` property.

#### HTML

First, we set up five multi-segment paths, all of which use a black stroke with a width of one, and no fill. Each path creates a series of mountain symbols, going from left (a shallow corner angle) to right (an extreme corner angle).

```html
<svg viewBox="0 0 39 30" xmlns="http://www.w3.org/2000/svg">
  <g stroke="black" stroke-width="1" fill="none">
    <path
      d="M1,5 l7   ,-3 l7   ,3
         m2,0 l3.5 ,-3 l3.5 ,3
         m2,0 l2   ,-3 l2   ,3
         m2,0 l0.75,-3 l0.75,3
         m2,0 l0.5 ,-3 l0.5 ,3" />
    <path
      d="M1,8 l7,-3 l7,3 m2,0 l3.5,-3 l3.5,3 m2,0 l2,-3 l2,3 m2,0 l0.75,-3 l0.75,3 m2,0 l0.5,-3 l0.5,3" />
    <path
      d="M1,14 l7,-3 l7,3 m2,0 l3.5,-3 l3.5,3 m2,0 l2,-3 l2,3 m2,0 l0.75,-3 l0.75,3 m2,0 l0.5,-3 l0.5,3" />
    <path
      d="M1,18 l7,-3 l7,3 m2,0 l3.5,-3 l3.5,3 m2,0 l2,-3 l2,3 m2,0 l0.75,-3 l0.75,3 m2,0 l0.5,-3 l0.5,3" />
    <path
      d="M1,26 l7,-3 l7,3 m2,0 l3.5,-3 l3.5,3 m2,0 l2,-3 l2,3 m2,0 l0.75,-3 l0.75,3 m2,0 l0.5,-3 l0.5,3" />
  </g>
</svg>
```

#### CSS

To the first four paths, we apply stroke width values as pairs to show how bare number values and pixel values are functionally equivalent. For the first two paths, the values are `.25` and `.25px`. For the second two paths, the values are `1` and `1px`.

For the fifth and last path, a value of `5%` is applied, thus setting a stroke width that is five percent as wide as the SVG viewport's diagonal measure is long.

```css
path:nth-child(1) {
  stroke-width: 0.25;
}
path:nth-child(2) {
  stroke-width: 0.25px;
}
path:nth-child(3) {
  stroke-width: 1;
}
path:nth-child(4) {
  stroke-width: 1px;
}
path:nth-child(5) {
  stroke-width: 5%;
}
```

#### Results

## See also

- `stroke`
- `stroke-dasharray`
- `stroke-dashoffset`
- `stroke-linecap`
- `stroke-linejoin`
- `stroke-miterlimit`
- `stroke-opacity`
- `fill`
- SVG `stroke-width` attribute
