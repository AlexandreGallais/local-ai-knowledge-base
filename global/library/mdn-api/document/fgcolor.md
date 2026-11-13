---
title: "Document: fgColor property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/fgcolor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: fgColor property

**`fgColor`** gets/sets the foreground color, or text color, of
the current document.

## Value

A string representing the color as a word (e.g., `"red"`) or hexadecimal value (e.g., `"#ff0000"`).

## Examples

```js
document.fgColor = "white";
document.bgColor = "darkblue";
```

## Notes

The default value for this property in Mozilla Firefox is black (`#000000`
in hexadecimal).

`document.fgColor` is deprecated in the HTML specification. The recommended alternative is the CSS property `color`
(e.g., `document.body.style.color = "red"`).
