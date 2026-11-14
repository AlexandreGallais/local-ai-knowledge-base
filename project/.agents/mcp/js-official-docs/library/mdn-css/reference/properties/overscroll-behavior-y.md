---
title: "`overscroll-behavior-y` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/overscroll-behavior-y/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `overscroll-behavior-y` CSS property

The **`overscroll-behavior-y`** CSS property sets the browser's behavior when the vertical boundary of a scrolling area is reached.

See `overscroll-behavior` for a full explanation.

## Syntax

```css
/* Keyword values */
overscroll-behavior-y: auto; /* default */
overscroll-behavior-y: chain;
overscroll-behavior-y: contain;
overscroll-behavior-y: none;

/* Global values */
overscroll-behavior-y: inherit;
overscroll-behavior-y: initial;
overscroll-behavior-y: revert;
overscroll-behavior-y: revert-layer;
overscroll-behavior-y: unset;
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

### Preventing an underlying element from scrolling

In our overscroll-behavior example (see the source code also), we present a full-page list of fake contacts, and a dialog box containing a chat window.

Both of these areas scroll; normally if you scrolled the chat window until you hit a scroll boundary, the underlying contacts window would start to scroll too, which is not desirable. This can be stopped using `overscroll-behavior-y` (`overscroll-behavior` would also work) on the chat window, like this:

```css
.messages {
  height: 220px;
  overflow: auto;
  overscroll-behavior-y: contain;
}
```

We also wanted to get rid of the standard overscroll effects when the contacts are scrolled to the top or bottom (e.g., Chrome on Android refreshes the page when you scroll past the top boundary). This can be prevented by setting `overscroll-behavior-y: none` on the `<html>` element:

```css
html {
  margin: 0;
  overscroll-behavior-y: none;
}
```

## See also

- `overscroll-behavior`
- `overscroll-behavior-x`
- `overscroll-behavior-inline`
- `overscroll-behavior-block`
- CSS overscroll behavior module
