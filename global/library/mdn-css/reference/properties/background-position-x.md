---
title: "`background-position-x` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/background-position-x/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `background-position-x` CSS property

The **`background-position-x`** CSS property sets the initial horizontal position for each background image. The position is relative to the position layer set by `background-origin`.

The value of this property is overridden by any declaration of the `background` or `background-position` shorthand properties applied to the element after it.

```css
background-position-x: left;
```

```css
background-position-x: center;
```

```css
background-position-x: 25%;
```

```css
background-position-x: 2rem;
```

```css
background-position-x: right 32px;
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
background-position-x: left;
background-position-x: center;
background-position-x: right;

/* <percentage> values */
background-position-x: 25%;

/* <length> values */
background-position-x: 0px;
background-position-x: 1cm;
background-position-x: 8em;

/* Side-relative values */
background-position-x: right 3px;
background-position-x: left 25%;

/* Multiple values */
background-position-x: 0px, center;

/* Global values */
background-position-x: inherit;
background-position-x: initial;
background-position-x: revert;
background-position-x: revert-layer;
background-position-x: unset;
```

### Values

This property is specified as one or more comma-separated values:

- `left`
    Aligns the left edge of the background image with the left edge of the background position layer.
- `center`
    Aligns the center of the background image with the center of the background position layer.
- `right`
    Aligns the right edge of the background image with the right edge of the background position layer.
- `<length>`
    The offset of the given background image's left vertical edge from the background position layer's left vertical edge. (Some browsers allow assigning the right edge for offset).
- `<percentage>`
    The offset of the given background image's horizontal position relative to the container. A value of 0% means that the left edge of the background image is aligned with the left edge of the container, and a value of 100% means that the _right_ edge of the background image is aligned with the _right_ edge of the container, thus a value of 50% horizontally centers the background image.

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
- `background-position-y`
- Using multiple backgrounds
