---
title: "`border-image` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-image/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-image` CSS property

The **`border-image`** CSS shorthand property draws an image around a given element. It replaces the element's regular border.

> **Note:**
> You should specify a separate `border-style` in case the border image fails to load. Although the specification doesn't strictly require it, some browsers don't render the border image if `border-style` is `none` or `border-width` is `0`.

```css
border-image: url("/shared-assets/images/examples/border-diamonds.png") 30;
```

```css
border-image: url("/shared-assets/images/examples/border-diamonds.png") 30 /
  19px round;
```

```css
border-image: url("/shared-assets/images/examples/border-diamonds.png") 30
  fill / 30px / 30px space;
```

```css
border-image: linear-gradient(#f6b73c, #4d9f0c) 30;
```

```css
border-image: repeating-linear-gradient(30deg, #4d9f0c, #9198e5, #4d9f0c 20px)
  60;
```

```html
<section id="default-example">
  <div id="example-element">This is a box with a border around it.</div>
</section>
```

```css
#example-element {
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  background: #fff3d4;
  color: black;
  border: 30px solid;
  border-image: url("/shared-assets/images/examples/border-diamonds.png") 30
    round;
  font-size: 1.2em;
}
```

## Constituent properties

This property is a shorthand for the following CSS properties:

- `border-image-outset`
- `border-image-repeat`
- `border-image-slice`
- `border-image-source`
- `border-image-width`

This shorthand property is reset, with all the longhand properties set to their initial values, by the CSS `border` shorthand property.

## Syntax

```css
/* source | slice */
border-image: linear-gradient(red, blue) 27;

/* source | slice | repeat */
border-image: url("/images/border.png") 27 space;

/* source | slice | width */
border-image: linear-gradient(red, blue) 27 / 35px;

/* source | slice | width | outset | repeat */
border-image: url("/images/border.png") 27 23 / 50px 30px / 1rem round space;

/* Global values */
border-image: inherit;
border-image: initial;
border-image: revert;
border-image: revert-layer;
border-image: unset;
```

The `border-image` property may be specified with anywhere from one to five of the values listed below.

> **Note:**
> If the computed value of `border-image-source` is `none`, or if the image cannot be displayed, the `border-style` will be displayed instead.

### Values

- `<'border-image-source'>`
    The source image. See `border-image-source`.
- `<'border-image-slice'>`
    The dimensions for slicing the source image into regions. Up to four values may be specified. See `border-image-slice`.
- `<'border-image-width'>`
    The width of the border image. Up to four values may be specified. See `border-image-width`.
- `<'border-image-outset'>`
    The distance of the border image from the element's outside edge. Up to four values may be specified. See `border-image-outset`.
- `<'border-image-repeat'>`
    Defines how the edge regions of the source image are adjusted to fit the dimensions of the border image. Up to two values may be specified. See `border-image-repeat`.

## Accessibility

Assistive technology cannot parse border images. If the image contains information critical to understanding the page's overall purpose, it is better to describe it semantically in the document.

- MDN Understanding WCAG, Guideline 1.1 explanations
- Understanding Success Criterion 1.1.1 | Understanding WCAG 2.0

## Examples

### Bitmap

In this example, we will apply a diamond pattern to an element's borders. The source for the border image is a ".png" file of 81 by 81 pixels, with three diamonds going vertically and horizontally:

#### HTML

```html
<div id="bitmap">
  This element is surrounded by a bitmap-based border image!
</div>
```

#### CSS

To match the size of a single diamond, we will use a value of 81 divided by 3, or `27`, for slicing the image into corner and edge regions. To center the border image on the edge of the element's background, we will make the outset values equal to half of the width values. Finally, a repeat value of `round` will make the border slices fit evenly, i.e., without clipping or gaps.

```css
#bitmap {
  width: 200px;
  background-color: #ffffaa;
  border: 36px solid orange;
  margin: 30px;
  padding: 10px;

  border-image: url("border.png") 27 / 36px 28px 18px 8px / 18px 14px 9px 4px
    round;
}
```

#### Result

### Gradient

#### HTML

```html
<div id="gradient">
  This element is surrounded by a gradient-based border image!
</div>
```

#### CSS

```css
#gradient {
  width: 200px;
  border: 30px solid;
  border-image: repeating-linear-gradient(45deg, #ff3333, #33bbff, #ff3333 30px)
    60;
  padding: 20px;
}
```

#### Result

### Rounded borders

`border-radius` has no effect on the border image. This is because `border-image-outset` is able to place the image outside the border box, so it doesn't make sense for the border image to be clipped by the border area. To create rounded borders when using a border image, you should create the image itself with rounded corners, or, in the case of a gradient, draw it as the background instead. Below, we show one approach to do this, which is to use two `background-image`s: one that extends the border box, and another for the padding box.

#### HTML

```html
<div id="rounded">
  This element is surrounded by a border image with rounded corners!
</div>
```

#### CSS

```css
#rounded {
  width: 200px;
  /* Use transparent so the background image is visible */
  border: 10px solid transparent;
  padding: 20px;
  border-radius: 20px;
  background-image:
    linear-gradient(white, white), linear-gradient(to right, cyan, lime);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
```

#### Result

> **Note:**
> There is a new ``background-clip`: border-area` value being proposed to address this use case.

## See also

- `border`
- `outline`
- `box-shadow`
- `background-image`
- `<url>` type
- Gradient functions: `conic-gradient()`, `repeating-conic-gradient()`, `linear-gradient()`, `repeating-linear-gradient()`, `radial-gradient()`, `repeating-radial-gradient()`
- Border images in CSS: A key focus area for Interop 2023 on MDN blog (2023)
