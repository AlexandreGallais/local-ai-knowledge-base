---
title: "`background-position-y` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/background-position-y/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `background-position-y` CSS property

The **`background-position-y`** CSS property sets the initial vertical position for each background image. The position is relative to the position layer set by `background-origin`.

The value of this property is overridden by any declaration of the `background` or `background-position` shorthand properties applied to the element after it.

```css
background-position-y: top;
```

```css
background-position-y: center;
```

```css
background-position-y: 25%;
```

```css
background-position-y: 2rem;
```

```css
background-position-y: bottom 32px;
```

```html
<section class="display-block" id="default-example">
  <div class="transition-all" id="example-element"></div>
</section>
```

```css
#example-element {
  background-color: navajowhite;
  background-image: url("/shared-assets/images/examples/star.png");
  background-repeat: no-repeat;
  height: 100%;
}
```

## Syntax

```css
/* Keyword values */
background-position-y: top;
background-position-y: center;
background-position-y: bottom;

/* <percentage> values */
background-position-y: 25%;

/* <length> values */
background-position-y: 0px;
background-position-y: 1cm;
background-position-y: 8em;

/* Side-relative values */
background-position-y: bottom 3px;
background-position-y: bottom 10%;

/* Multiple values */
background-position-y: 0px, center;

/* Global values */
background-position-y: inherit;
background-position-y: initial;
background-position-y: revert;
background-position-y: revert-layer;
background-position-y: unset;
```

### Values

This property is specified as one or more comma-separated values:

- `top`
    Aligns the top edge of the background image with the top edge of the background position layer.
- `center`
    Aligns the vertical center of the background image with the vertical center of the background position layer.
- `bottom`
    Aligns the bottom edge of the background image with the bottom edge of the background position layer.
- `<length>`
    The offset of the given background image's horizontal edge from the corresponding background position layer's top horizontal edge. (Some browsers allow assigning the bottom edge for offset).
- `<percentage>`
    The offset of the given background image's vertical position relative to the container. A value of 0% means that the top edge of the background image is aligned with the top edge of the container, and a value of 100% means that the _bottom_ edge of the background image is aligned with the _bottom_ edge of the container, thus a value of 50% vertically centers the background image.

## Examples

### Basic <example-value>

The following example shows a background image implementation, with background-position-x and background-position-y used to define the image's horizontal and vertical positions separately.

#### HTML

```html
<div></div>
```

#### CSS

```css
div {
  width: 300px;
  height: 300px;
  background-color: skyblue;
  background-image: url("https://mdn.dev/archives/media/attachments/2020/07/29/17350/3b4892b7e820122ac6dd7678891d4507/firefox.png");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
```

#### Result

### Side-relative values

The following example shows support for side-relative offset syntax, which allows the developer to offset the background from any edge.

#### HTML

```html
<div></div>
```

#### CSS

```css
div {
  width: 300px;
  height: 300px;
  background-color: seagreen;
  background-image: url("https://mdn.dev/archives/media/attachments/2020/07/29/17350/3b4892b7e820122ac6dd7678891d4507/firefox.png");
  background-repeat: no-repeat;
  background-position-x: right 20px;
  background-position-y: bottom 10px;
}
```

#### Result

## See also

- `background-position`
- `background-position-x`
- Using multiple backgrounds
