---
title: "`mask-border` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/mask-border/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `mask-border` CSS property

The **`mask-border`** CSS shorthand property lets you create a mask along the edge of an element's border.

## Constituent properties

This property is a shorthand for the following CSS properties:

- `mask-border-mode`
- `mask-border-outset`
- `mask-border-repeat`
- `mask-border-slice`
- `mask-border-source`
- `mask-border-width`

## Syntax

```css
/* source | slice */
mask-border: url("border-mask.png") 25;

/* source | slice | repeat */
mask-border: url("border-mask.png") 25 space;

/* source | slice | width */
mask-border: url("border-mask.png") 25 / 35px;

/* source | slice | width | outset | repeat | mode */
mask-border: url("border-mask.png") 25 / 35px / 12px space alpha;

/* Global values */
mask-border: inherit;
mask-border: initial;
mask-border: revert;
mask-border: revert-layer;
mask-border: unset;
```

### Values

- `<'mask-border-source'>`
    The source image. See `mask-border-source`.
- `<'mask-border-slice'>`
    The dimensions for slicing the source image into regions. Up to four values may be specified. See `mask-border-slice`.
- `<'mask-border-width'>`
    The width of the border mask. Up to four values may be specified. See `mask-border-width`.
- `<'mask-border-outset'>`
    The distance of the border mask from the element's outside edge. Up to four values may be specified. See `mask-border-outset`.
- `<'mask-border-repeat'>`
    Defines how the edge regions of the source image are adjusted to fit the dimensions of the border mask. Up to two values may be specified. See `mask-border-repeat`.
- `<'mask-border-mode'>`
    Defines whether the source image is treated as a luminance mask or alpha mask. See `mask-border-mode`.

## Examples

### Setting a bitmap-based mask border

In this example, we will mask an element's border with a diamond pattern. The source for the mask is a ".png" file of 90 by 90 pixels, with three diamonds going vertically and horizontally:

To match the size of a single diamond, we will use a value of 90 divided by 3, or `30`, for slicing the image into corner and edge regions. A repeat value of `round` will make the mask slices fit evenly, i.e., without clipping or gaps.

```html
<div class="masked">
  This element is surrounded by a bitmap-based mask border! Pretty neat, isn't
  it?
</div>
```

```css
.masked {
  width: 200px;
  background-color: lavender;
  border: 18px solid salmon;
  padding: 10px;

  -webkit-mask-box-image: url("https://mdn.github.io/shared-assets/images/examples/mask-border-diamonds.png")
    30 fill /          /* slice */
    20px /             /* width */
    1px                /* outset */
    round;             /* repeat */

  mask-border:
    url("https://mdn.github.io/shared-assets/images/examples/mask-border-diamonds.png")
    30 fill /        /* slice */
    20px /           /* width */
    1px              /* outset */
    round;           /* repeat */
}
```

## See also

- `mask-border-mode`
- `mask-border-outset`
- `mask-border-repeat`
- `mask-border-source`
- `mask-border-width`
