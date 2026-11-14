---
title: "`border-image-width` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-image-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-image-width` CSS property

The **`border-image-width`** CSS property sets the width of an element's border image.

If this property's value is greater than the element's `border-width`, the border image will extend beyond the padding (and/or content) edge.

```css
border-image-width: 30px;
```

```css
border-image-width: 15px 40px;
```

```css
border-image-width: 2.6rem;
```

```css
border-image-width: 20% 8%;
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

## Syntax

```css
/* Keyword value */
border-image-width: auto;

/* <length> value */
border-image-width: 1rem;

/* <percentage> value */
border-image-width: 25%;

/* <number> value */
border-image-width: 3;

/* top and bottom | left and right */
border-image-width: 2em 3em;

/* top | left and right | bottom */
border-image-width: 5% 15% 10%;

/* top | right | bottom | left */
border-image-width: 5% 2em 10% auto;

/* Global values */
border-image-width: inherit;
border-image-width: initial;
border-image-width: revert;
border-image-width: revert-layer;
border-image-width: unset;
```

The `border-image-width` property may be specified using one, two, three, or four values chosen from the list of values below.

- When **one** value is specified, it applies the same width to **all four sides**.
- When **two** values are specified, the first width applies to the **top and bottom**, the second to the **left and right**.
- When **three** values are specified, the first width applies to the **top**, the second to the **left and right**, the third to the **bottom**.
- When **four** values are specified, the widths apply to the **top**, **right**, **bottom**, and **left** in that order (clockwise).

### Values

- `<length-percentage>`
    The width of the border, specified as a `<length>` or a `<percentage>`. Percentages are relative to the _width_ of the border image area for horizontal offsets and the _height_ of the border image area for vertical offsets. Must not be negative.
- `<number>`
    The width of the border, specified as a multiple of the corresponding `border-width`. Must not be negative.
- `auto`
    The width of the border is made equal to the intrinsic width or height (whichever is applicable) of the corresponding `border-image-slice`. If the image does not have the required intrinsic dimension, the corresponding `border-width` is used instead.

## Examples

### Tiling a border image

This example creates a border image using the following ".png" file, which is 90 by 90 pixels:

Thus, each circle in the source image is 30 by 30 pixels.

#### HTML

```html
<p>
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
  eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
  voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
  kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
</p>
```

#### CSS

```css
p {
  border: 20px solid;
  border-image: url("border.png") 30 round;
  border-image-width: 16px;
  padding: 40px;
}
```

#### Result

## See also

- Backgrounds and borders
- Learn CSS: Backgrounds and borders
- Border images in CSS: A key focus area for Interop 2023 on MDN blog (2023)
