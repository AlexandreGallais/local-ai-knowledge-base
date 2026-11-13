---
title: "`-webkit-mask-position-y` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/-webkit-mask-position-y/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-webkit-mask-position-y` CSS property

The `-webkit-mask-position-y` CSS property sets the initial vertical position of a mask image.

## Syntax

```css
/* Keyword values */
-webkit-mask-position-y: top;
-webkit-mask-position-y: center;
-webkit-mask-position-y: bottom;

/* <percentage> values */
-webkit-mask-position-y: 100%;
-webkit-mask-position-y: -50%;

/* <length> values */
-webkit-mask-position-y: 50px;
-webkit-mask-position-y: -1cm;

/* Multiple values */
-webkit-mask-position-y:
  50px,
  25%,
  -3em;

/* Global values */
-webkit-mask-position-y: inherit;
-webkit-mask-position-y: initial;
-webkit-mask-position-y: revert;
-webkit-mask-position-y: revert-layer;
-webkit-mask-position-y: unset;
```

### Values

This property is specified as one or more comma-separated values:

- `<length-percentage>`
    A length indicating the position of the top side of the image relative to the box's top padding edge. Percentages are calculated against the vertical dimension of the box padding area. A value of `0%` means the top edge of the image is aligned with the box's top padding edge and a value of `100%` means the bottom edge of the image is aligned with the box's bottom padding edge.
- `top`
    Equivalent to `0%`.
- `bottom`
    Equivalent to `100%`.
- `center`
    Equivalent to `50%`.

## Examples

### Vertically positioning a mask image

```css
.exampleOne {
  -webkit-mask-image: url("mask.png");
  -webkit-mask-position-y: bottom;
}

.exampleTwo {
  -webkit-mask-image: url("mask.png");
  -webkit-mask-position-y: 25%;
}
```

## Specifications

Not part of any standard.

## See also

- `-webkit-mask-position`
- `-webkit-mask-position-x`
- `-webkit-mask-origin`
