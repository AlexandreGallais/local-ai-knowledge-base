---
title: "Window: scrollMaxX property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/scrollmaxx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: scrollMaxX property

The **`Window.scrollMaxX`** read-only property returns the
maximum number of pixels that the document can be scrolled horizontally.

## Value

A number.

## Examples

```js
// Scroll to right edge of the page
let maxX = window.scrollMaxX;

window.scrollTo(maxX, 0);
```

## Notes

Do not use this property to get the total document width, which is not equivalent to window.innerWidth + window\.scrollMaxX,
because `window.innerWidth` includes the width of any visible vertical
scrollbar, thus the result would exceed the total document width by the width of any
visible vertical scrollbar. Instead use
`document.body.scrollWidth`. See also
`window.scrollMaxY`.

## Specifications

This is not part of any specification.
