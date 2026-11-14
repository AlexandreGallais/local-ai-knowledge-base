---
title: "`clip-rule` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/clip-rule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `clip-rule` CSS property

The **`clip-rule`** CSS property determines, when parts of the path overlap other parts, which pixels in a mask's box are inside the clipping shape defined by a clip path and which are outside.

The `clip-rule` property only applies to SVG elements that are contained within a `<clipPath>` element, overriding the element's `clip-rule` attribute value if present. The `clip-rule` property basically works as the `fill-rule` property, except that it applies to `<clipPath>` definitions. It does not have any effect on CSS `basic-shape`s.

## Syntax

```css
/* Keyword values */
clip-rule: nonzero;
clip-rule: evenodd;

/* Global values */
clip-rule: inherit;
clip-rule: initial;
clip-rule: revert;
clip-rule: revert-layer;
clip-rule: unset;
```

### Values

This property is specified as one of the following keyword values:

- `nonzero`
    For every point in the clipping mask's box, a ray is drawn in a random direction. Every time the ray intersects with any part of the clipping path, a tally is increased by one if the clipping path's part is moving from left to right across the ray, whereas it is decreased by one if the path part is moving right to left across the ray. If the final total of the tally is zero, the point is outside the path's shape. Otherwise, it's inside the path's shape.

- `even-odd`
    For every point in the clipping mask's box, a ray is drawn in a random direction. Every time the ray intersects with any part of the clipping path, a tally is increased by one. If the final total of the tally is even, the point is outside the path's shape; otherwise, it's inside the path's shape. Zero is taken to be even.

## Examples

### Value comparison

In this example, we will apply different CSS `clip-rule` values to similar SVG `` elements to demonstrate the difference between `evenodd` and `non-zero`.

#### HTML

The markup has multiple `` containers, each containing a `<clipPath>` element that defines a star shape, and a `<rect>` element to draw the star inside. The stars are created with overlapping lines. Other than the `id`, the markup of the first two SVG elements is identical. The third SVG includes just the `` element, showing how the lines of the path that created the star overlap.

```html
<svg>
  <clipPath id="star1">
    <path d="M50,0 21,90 98,35 2,35 79,90z" />
  </clipPath>
  <rect clip-path="url(#star1)" width="95" height="95" />
</svg>

<svg>
  <clipPath id="star2">
    <path d="M50,0 21,90 98,35 2,35 79,90z" />
  </clipPath>
  <rect clip-path="url(#star2)" width="95" height="95" />
</svg>

<svg id="star3">
  <path d="M50,0 21,90 98,35 2,35 79,90z" />
</svg>
```

#### CSS

The `clip-rule` for the `` in the first SVG is set to `evenodd`; `nonzero` in the second SVG. For the path-only SVG, we removed the default `fill` and defined both a `stroke` color and `stroke-width` to make the overlapping path lines visible:

```css
body {
  display: flex;
  gap: 20px;
}
svg {
  width: 110px;
  height: 110px;
}
```

```css
#star1 path {
  clip-rule: evenodd;
}

#star2 path {
  clip-rule: nonzero;
}

#star3 path {
  fill: none;
  stroke: black;
  stroke-width: 1;
}
```

#### Results

### Within basic shape definitions

This example demonstrates that, while the `clip-rule` does not have any effect on CSS `basic-shape`s, it can affect a `<clipPath>` used as the source of a shape.

#### HTML

We include an SVG with two `<clipPath>` elements that define star shapes, which are identical except for their `id` attribute values. We also include two `` elements that will contain our star shapes.

```html
<svg height="0" width="0">
  <defs>
    <clipPath id="star1">
      <path d="M100,0 42,180 196,70 4,70 158,180z" />
    </clipPath>
    <clipPath id="star2">
      <path d="M100,0 42,180 196,70 4,70 158,180z" />
    </clipPath>
  </defs>
</svg>

<div></div>
<div></div>
```

#### CSS

We provide the `` elements with a set `width` and `height`, adding a `conic-gradient()` for their `background-image` value:

```css
body {
  display: flex;
  gap: 20px;
}
```

```css
div {
  height: 200px;
  width: 200px;
  background-image: conic-gradient(
    at center,
    rebeccapurple,
    green,
    lightblue,
    rebeccapurple
  );
}
```

We use the `clip-path` property to set the different `<clipPath>` elements as the clipping path for each ``:

```css
div:first-of-type {
  clip-path: url("#star1");
}
div:last-of-type {
  clip-path: url("#star2");
}
```

Finally, we set the different `clip-rule` values for each of the `<clipPath>` element's ``s:

```css
#star1 path {
  clip-rule: evenodd;
}
#star2 path {
  clip-rule: nonzero;
}
```

#### Results

### Choosing between rules for a path with all clockwise paths

In this SVG image, we have two rectangles that are clipped, once with each clipping rule. There are two `<clipPath>` elements, so that one can be set to use the non-zero clipping rule and the other uses the even-odd rule. Both paths are drawn in a clockwise direction for both its inner and outer parts.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50">
  <g stroke="#112233" fill="#bbccdd">
    <!-- basic <example-value> and clipping path visualization follow -->
    <rect x="10" y="10" width="30" height="30" />
    <path
      d="M 65,5 l 20,20 -20,20 -20,-20 20,-20 m 0,10 l 10,10 -10,10 -10,-10 10,-10 z"
      fill="none"
      stroke-width="0.5" />
    <!-- rectangles to be clipped follow -->
    <rect x="110" y="10" width="30" height="30" clip-path="url(#clipper1)" />
    <rect x="160" y="10" width="30" height="30" clip-path="url(#clipper2)" />
  </g>
  <!-- clipping paths follow -->
  <clipPath id="clipper1" clipPathUnits="objectBoundingBox">
    <path
      d="M 0.5 -0.15 l 0.65 0.65 -0.65,0.65 -0.65,-0.65 0.65,-0.65 m 0,0.33 l 0.33,0.33 -0.33,0.33 -0.33,-0.33 0.33,-0.33 z"
      clip-rule="evenodd" />
  </clipPath>
  <clipPath id="clipper2" clipPathUnits="objectBoundingBox">
    <path
      d="M 0.5 -0.15 l 0.65 0.65 -0.65,0.65 -0.65,-0.65 0.65,-0.65 m 0,0.33 l 0.33,0.33 -0.33,0.33 -0.33,-0.33 0.33,-0.33 z"
      clip-rule="nonzero" />
  </clipPath>
</svg>
```

To the clipping paths that are applied to the clipped rectangles, the CSS `clip-rule` property is used to set one path to use the `nonzero` rules, and the other to use the `evenodd` rule. These override the values of the `clip-path` attributes in the SVG, which have been intentionally set to the opposite values as the CSS imposes.

```css
#clipper1 {
  clip-rule: nonzero;
}
#clipper2 {
  clip-rule: evenodd;
}
```

Because both the inner and outer parts of the path move in a clockwise (left-to-right) direction, the resulting clip shape will be different between the two clipping rules. For `nonzero`, any ray inside the outer part of the shape will tally to a value above zero, because it will encounter one or more left-to-right path fragments. For `even-odd`, points between the two parts of the path will have an odd-numbered tally, whereas any point either inside the inner path or outside the outer part will have an even-numbered tally.

### Choosing between rules for a path with different winding paths

This example uses the same SVG as the previous example, with the change that the interior part of the clipping path winds in a counterclockwise direction.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50">
  <g stroke="#112233" fill="#bbccdd">
    <!-- basic <example-value> and clipping path visualization follow -->
    <rect x="10" y="10" width="30" height="30" />
    <path
      d="M 65,5 l 20,20 -20,20 -20,-20 20,-20 m 0,10 l 10,10 -10,10 -10,-10 10,-10 z"
      fill="none"
      stroke-width="0.5" />
    <!-- rectangles to be clipped follow -->
    <rect x="110" y="10" width="30" height="30" clip-path="url(#clipper1)" />
    <rect x="160" y="10" width="30" height="30" clip-path="url(#clipper2)" />
  </g>
  <!-- clipping paths follow -->
  <clipPath id="clipper1" clipPathUnits="objectBoundingBox">
    <path
      d="M 0.5 -0.15 l 0.65 0.65 -0.65,0.65 -0.65,-0.65 0.65,-0.65 m 0,0.33 l -0.33,0.33 0.33,0.33 0.33,-0.33 -0.33,-0.33 z" />
  </clipPath>
  <clipPath id="clipper2" clipPathUnits="objectBoundingBox">
    <path
      d="M 0.5 -0.15 l 0.65 0.65 -0.65,0.65 -0.65,-0.65 0.65,-0.65 m 0,0.33 l 0.33,0.33 -0.33,0.33 -0.33,-0.33 0.33,-0.33 z" />
  </clipPath>
</svg>
```

We apply the same CSS as before.

```css
#clipper1 {
  clip-rule: nonzero;
}
#clipper2 {
  clip-rule: evenodd;
}
```

In this case, because the outer part of the path moves in a clockwise (left-to-right) direction and the interior part of the path moves in a counterclockwise (right-to-left) direction, the resulting clip shape will be the same regardless of which clipping rule is used.

## See also

- `fill-rule`
- `clip-path`
- Introduction to CSS clipping
- CSS masking module
- SVG `clip-rule` attribute
- SVG `<clipPath>` element
- SVG `fill-rule` attribute
