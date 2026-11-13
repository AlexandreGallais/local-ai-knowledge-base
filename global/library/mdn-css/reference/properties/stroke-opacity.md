---
title: "`stroke-opacity` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/stroke-opacity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `stroke-opacity` CSS property

The **`stroke-opacity`** CSS property defines the opacity of an SVG shape's stroke. The effect is identical to that of `opacity`, except it is applied only to the stroke, not to the entire element. If present, it overrides the element's `stroke-opacity` attribute.

This property applies to SVG shapes and text-content elements (see `stroke-opacity` for a full list), but as an inherited property, it may be applied to elements such as `` and still have the intended effect on descendant elements' strokes.

Note that a shape's stroke partially covers the fill of that shape, so a stroke with an opacity less than `1` will show the fill blended with the stroke where they overlap. To avoid this effect, it is possible to apply a global opacity with the `opacity` property or to put the stroke behind the fill with the `paint-order` attribute.

## Syntax

```css
/* numeric and percentage values */
stroke-opacity: 1;
stroke-opacity: 0.3;
stroke-opacity: 50%;

/* Global values */
stroke-opacity: inherit;
stroke-opacity: initial;
stroke-opacity: revert;
stroke-opacity: revert-layer;
stroke-opacity: unset;
```

### Values

- `<number>`
    Any real number from 0 to 1, inclusive. A value of `0` makes the stroke completely transparent, and a value of `1` makes it completely opaque. Values outside the range 0 – 1 are clipped to the nearest end of that range; thus, negative values are clipped to `0`.

- `<percentage>`
    The same as `<number>` (see above), except the allowed range is 0% to 100% and clipping is done with regard to that range.

## Examples

### Various stroke opacities

This example demonstrates basic usage of the `stroke-opacity` property and how, as a shape's stroke partially covers its fill, a stroke with an opacity less than `1` blends with the fill where they overlap.

#### HTML

First, we set up five multi-segment paths, all of which use a black stroke with a width of one, and a `dodgerblue` fill for the subpaths. Each path creates a series of mountain symbols, going from left (a shallow corner angle) to right (an extreme corner angle).

```html
<svg viewBox="0 0 39 36" xmlns="http://www.w3.org/2000/svg">
  <g stroke="black" stroke-width="1" fill="dodgerblue">
    <path
      d="M1,5 l7   ,-3 l7   ,3
         m2,0 l3.5 ,-3 l3.5 ,3
         m2,0 l2   ,-3 l2   ,3
         m2,0 l0.75,-3 l0.75,3
         m2,0 l0.5 ,-3 l0.5 ,3" />
    <path
      d="M1,12 l7,-3 l7,3 m2,0 l3.5,-3 l3.5,3 m2,0 l2,-3 l2,3 m2,0 l0.75,-3 l0.75,3 m2,0 l0.5,-3 l0.5,3" />
    <path
      d="M1,19 l7,-3 l7,3 m2,0 l3.5,-3 l3.5,3 m2,0 l2,-3 l2,3 m2,0 l0.75,-3 l0.75,3 m2,0 l0.5,-3 l0.5,3" />
    <path
      d="M1,26 l7,-3 l7,3 m2,0 l3.5,-3 l3.5,3 m2,0 l2,-3 l2,3 m2,0 l0.75,-3 l0.75,3 m2,0 l0.5,-3 l0.5,3" />
    <path
      d="M1,33 l7,-3 l7,3 m2,0 l3.5,-3 l3.5,3 m2,0 l2,-3 l2,3 m2,0 l0.75,-3 l0.75,3 m2,0 l0.5,-3 l0.5,3" />
  </g>
</svg>
```

#### CSS

To these paths, we apply a successively higher stroke opacity value. For the first four paths, the fill can be seen through the inner half of the stroke path, though it may be difficult to discern for the fourth path. For the fifth and last path, the stroke is fully opaque and so the fill cannot be seen through the stroke.

```css
g path:nth-child(1) {
  stroke-opacity: 0.2;
} /* equiv. 20% */
g path:nth-child(2) {
  stroke-opacity: 0.4;
} /* equiv. 40% */
g path:nth-child(3) {
  stroke-opacity: 0.6;
} /* equiv. 60% */
g path:nth-child(4) {
  stroke-opacity: 0.8;
} /* equiv. 80% */
g path:nth-child(5) {
  stroke-opacity: 1;
} /* equiv. 100% */
```

#### Results

## See also

- `opacity`
- `fill-opacity`
- `paint-order`
- `stroke`
- `stroke-dasharray`
- `stroke-dashoffset`
- `stroke-linecap`
- `stroke-linejoin`
- `stroke-miterlimit`
- `stroke-width`
- SVG `stroke-opacity` attribute
