---
title: "`vector-effect` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/vector-effect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `vector-effect` CSS property

The **`vector-effect`** CSS property suppresses specific transformation effects in SVG, thus permitting effects like a road on a map staying the same width no matter how the map is zoomed, or allowing a diagram key to retain its position and size regardless of other transforms. It can only be used with SVG elements that accept the `vector-effect` attribute. When used, the CSS value overrides any values of the element's `vector-effect` attribute.

## Syntax

```css
/* Keyword values */
vector-effect: none;
vector-effect: non-scaling-stroke;

/* Global values */
vector-effect: inherit;
vector-effect: initial;
vector-effect: revert;
vector-effect: revert-layer;
vector-effect: unset;
```

### Values

This property is specified as one of the following keyword values:

- `none`
    No vector effects are applied to the element, meaning it will be fully affected by transforms as normal.
- `non-scaling-stroke`
    The element's drawn stroke width will be physically equal in size to its defined stroke width, even if the element has been scaled up or down in size due to transforms of either itself or its coordinate system. This is the case whether the element is scaled with transforms or by physical resizing of the entire image.

> **Note:**
> The spec defines three other values, `non-scaling-size`, `non-rotation`, and `fixed-position`, but these have no implementations and are considered at-risk.

## Examples

### Preventing SVG stroke scaling with CSS

Here, we start with a 200x100 SVG image that contains two rectangles inside a group. The group is scaled up and rotated. The second of the two rectangles has a class of `thinned`.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
  <g
    transform="scale(2.3) rotate(23)"
    transform-origin="100 50"
    stroke-width="3"
    stroke="orange"
    fill="#ddeeff88">
    <rect x=" 60" y="20" width="30" height="60" />
    <rect x="110" y="20" width="30" height="60" class="thinned" />
  </g>
</svg>
```

To this SVG image, we apply `width: 500px` to make it larger than its intrinsic size, and set the classed `<rect>` to have non-scaled strokes.

```css
svg {
  width: 500px;
}
svg rect.thinned {
  vector-effect: non-scaling-stroke;
}
```

The result is that the first of the two rectangles has an apparent (visual) stroke width of approximately 17, whereas the second rectangle still has an apparent stroke width of 3 despite having been scaled up in the same way the first rectangle has.

### Overriding SVG stroke scaling values with CSS

In this case, we start with a similar SVG image to the one used in the previous example. Here, the `` element is rotated as before, but no scaling is applied to it. The `<rect>` elements are given a common origin for their transforms, and have their `vector-effect` SVG attributes set to a value of `none`.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
  <g
    transform="rotate(23)"
    transform-origin="100 50"
    stroke-width="3"
    stroke="orange"
    fill="#ddeeff88">
    <rect
      x=" 60"
      y="20"
      width="30"
      height="60"
      transform-origin="100 50"
      vector-effect="none" />
    <rect
      x="110"
      y="20"
      width="30"
      height="60"
      transform-origin="100 50"
      vector-effect="none"
      class="thinned" />
  </g>
</svg>
```

As before, the SVG is made larger than its intrinsic size using CSS. This time, scaling is applied to the `<rect>` elements directly, and the second rectangle is set to have its strokes non-scaled.

```css
svg {
  width: 500px;
}
svg rect {
  transform: scale(2.3);
}
svg rect.thinned {
  vector-effect: non-scaling-stroke;
}
```

The result is visually identical to that of the previous example. What we can see is that the attribute value of `none` is overridden by the CSS value `non-scaling-stroke`, and that the vector effects are honored even though the scaling was done directly on the `<rect>` rather than on its parent `` element.

## See also

- `stroke`
- `basic-shape` data type
- SVG `vector-effect` attribute
