---
title: "`border-image-outset` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-image-outset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-image-outset` CSS property

The **`border-image-outset`** CSS property sets the distance by which an element's border image is set out from its border box.

The parts of the border image that are rendered outside the element's border box with `border-image-outset` do not trigger overflow scrollbars and don't capture mouse events.

```css
border-image-outset: 0;
```

```css
border-image-outset: 15px;
```

```css
border-image-outset: 30px;
```

```css
border-image-outset: 40px;
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
/* <length> value */
border-image-outset: 1rem;

/* <number> value */
border-image-outset: 1.5;

/* top and bottom | left and right */
border-image-outset: 1 1.2;

/* top | left and right | bottom */
border-image-outset: 30px 2 45px;

/* top | right | bottom | left */
border-image-outset: 7px 12px 14px 5px;

/* Global values */
border-image-outset: inherit;
border-image-outset: initial;
border-image-outset: revert;
border-image-outset: revert-layer;
border-image-outset: unset;
```

The `border-image-outset` property may be specified as one, two, three, or four values. Each value is a `<length>` or `<number>`. Negative values are invalid and will cause the `border-image-outset` declaration to be ignored.

1. If **one** value is specified, it applies to **all four sides**.
2. If **two** values are specified, the first applies to the **top and bottom** and the second to the **left and right**.
3. If **three** values are specified, the first applies to the **top**, the second to the **left and right**, and the third to the **bottom**.
4. If **four** values are specified, they apply to the **top**, **right**, **bottom**, and **left** in that order (clockwise).

### Values

- `<length>`
    The size of the `border-image` outset as a dimension — a number with a unit.
- `<number>`
    The size of the `border-image` outset as a multiple of the element's corresponding `border-width`s. For example, if an element has `border-width: 1em 2px 0 1.5rem`, and `border-image-outset: 2`, the final `border-image-outset` would be calculated as `2em 4px 0 3rem`.

## Examples

### Outsetting a border image

#### HTML

```html
<div id="outset">This element has an outset border image!</div>
```

#### CSS

```css
#outset {
  width: 10rem;
  background: #cceeff;
  border: 1.4rem solid;
  border-image: radial-gradient(#ffff22, #5555ff) 40;
  border-image-outset: 1.5; /* 1.5 × 1.4rem = 2.1rem */
  margin: 2.1rem;
}
```

#### Result

## See also

- Backgrounds and borders
- Learn CSS: Backgrounds and borders
- Border images in CSS: A key focus area for Interop 2023 on MDN blog (2023)
