---
title: "`overscroll-behavior-x` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/overscroll-behavior-x/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `overscroll-behavior-x` CSS property

The **`overscroll-behavior-x`** CSS property sets the browser's behavior when the horizontal boundary of a scrolling area is reached.

See `overscroll-behavior` for a full explanation.

## Syntax

```css
/* Keyword values */
overscroll-behavior-x: auto; /* default */
overscroll-behavior-x: chain;
overscroll-behavior-x: contain;
overscroll-behavior-x: none;

/* Global values */
overscroll-behavior-x: inherit;
overscroll-behavior-x: initial;
overscroll-behavior-x: revert;
overscroll-behavior-x: revert-layer;
overscroll-behavior-x: unset;
```

### Values

This property is specified as one of the following keyword values:

- `auto`
    Allows the default behavior at a scroll boundary. Scrolling may continue in another scroll container.
- `chain`
    Allows scrolling to continue outside the scroll container, but prevents overscroll "bounce" effects.
- `contain`
    Prevents scrolling from continuing outside the scroll container. "Bounce" effects may still occur.
- `none`
    Prevents scrolling from continuing outside the scroll container and also prevents overscroll "bounce" effects.

## Examples

### Preventing an underlying element from scrolling horizontally

In our overscroll-behavior-x example (see source code also), we have two block-level boxes, one inside the other. The outer box has a large `width` set on it so the page will scroll horizontally. The inner box has a small width (and `height`) set on it so it sits comfortably inside the viewport, but its content is given a large `width` so it will scroll horizontally.

By default, when the inner box is scrolled and a scroll boundary is reached, the whole page will begin to scroll, which is probably not what we want. To avoid this, you can set `overscroll-behavior-x: contain` on the inner box:

```css
main > div {
  height: 300px;
  width: 500px;
  overflow: auto;
  position: relative;
  top: 100px;
  left: 100px;
  overscroll-behavior-x: contain;
}
```

## See also

- `overscroll-behavior`
- `overscroll-behavior-y`
- `overscroll-behavior-inline`
- `overscroll-behavior-block`
- CSS overscroll behavior module
