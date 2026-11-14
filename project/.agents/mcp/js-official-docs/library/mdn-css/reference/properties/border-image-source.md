---
title: "`border-image-source` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/border-image-source/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `border-image-source` CSS property

The **`border-image-source`** CSS property sets the source image used to create an element's border image.

The `border-image-slice` property is used to divide the source image into regions, which are then dynamically applied to the final border image.

```css
border-image-source: url("/shared-assets/images/examples/border-diamonds.png");
```

```css
border-image-source: url("/shared-assets/images/examples/border-stars.png");
```

```css
border-image-source: repeating-linear-gradient(
  45deg,
  transparent,
  #4d9f0c 20px
);
```

```css
border-image-source: none;
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
border-image-source: none;

/* <image> values */
border-image-source: url("image.jpg");
border-image-source: linear-gradient(to top, red, yellow);

/* Global values */
border-image-source: inherit;
border-image-source: initial;
border-image-source: revert;
border-image-source: revert-layer;
border-image-source: unset;
```

### Values

- `none`
    No border image is used. The appearance defined by `border-style` is displayed instead.
- `image`
    Image reference to use for the border.

## Examples

### Basic <example-value>

```css
.box {
  border-image-source: url("image.png");
}
```

## See also

- `border`
- `outline`
- `box-shadow`
- `background-image`
- `<url>` type
- Border images in CSS: A key focus area for Interop 2023 on MDN blog (2023)
