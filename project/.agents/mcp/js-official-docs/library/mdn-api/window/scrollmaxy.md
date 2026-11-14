---
title: "Window: scrollMaxY property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/scrollmaxy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: scrollMaxY property

The **`Window.scrollMaxY`** read-only property returns the
maximum number of pixels that the document can be scrolled vertically.

## Value

A number.

## Examples

```js
// Scroll to the bottom of the page
let maxY = window.scrollMaxY;

window.scrollTo(0, maxY);
```

## Notes

Do not use this property to get the total document height, which is not equivalent to
`window.innerHeight` + window\.scrollMaxY, because
`window.innerHeight` includes the width of any visible horizontal
scrollbar, thus the result would exceed the total document height by the width of any
visible horizontal scrollbar. Instead use
`document.body.scrollHeight`. See also
`window.scrollMaxX` and `window.scrollTo`.

## Specifications

This is not part of any specification.
