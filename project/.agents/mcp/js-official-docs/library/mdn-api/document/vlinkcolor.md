---
title: "Document: vlinkColor property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/vlinkcolor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: vlinkColor property

The **`Document.vlinkColor`** property gets/sets the color of
links that the user has visited in the document.

## Value

A string representing the color as a word (e.g., `"red"`) or hexadecimal value (e.g., `"#ff0000"`).

When set to the `null` value, that `null` value is converted to the empty string (`""`), so `document.vlinkColor = null` is equivalent to `document.vlinkColor = ""`.

## Notes

- The default value for this property in Mozilla Firefox is purple
  (`#551a8b` in hexadecimal).
- `Document.vlinkColor` is deprecated in the HTML specification.
- The recommended alternative is to get/set the color of the CSS `:visited` pseudo-class on HTML `` elements (e.g., `a:visited {color:red;}`).
