---
title: "Document: alinkColor property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/alinkcolor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: alinkColor property

Returns or sets the color of an active link in the document body. A link is active
during the time between `mousedown` and `mouseup` events.

## Value

A string containing the name of the color (e.g., `blue`, `darkblue`, etc.) or the hexadecimal value of the color (e.g., `#0000FF`).

When set to the `null` value, that `null` value is converted to the empty string (`""`), so `document.alinkColor = null` is equivalent to `document.alinkColor = ""`.

## Notes

The default value for this property in Mozilla Firefox is red (`#ee0000` in
hexadecimal).

`document.alinkColor` is deprecated in the HTML specification. One alternative is the CSS selector `:active`.

Firefox supports both `alinkColor`/`:active` and `:focus`.
