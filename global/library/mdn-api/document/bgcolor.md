---
title: "Document: bgColor property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/bgcolor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: bgColor property

The deprecated `bgColor` property gets or sets the background color of the
current document.

## Value

A string representing the color as a word (e.g., `"red"`) or hexadecimal value (e.g., `"#ff0000"`).

When set to the `null` value, that `null` value is converted to the empty string (`""`), so `document.bgColor = null` is equivalent to `document.bgColor = ""`.

## Examples

```js
document.bgColor = "darkblue";
```

## Notes

The default value for this property in Firefox is white (`#ffffff` in
hexadecimal).

`document.bgColor` is deprecated in the HTML specification. The recommended alternative is use of the CSS style
`background-color` which can be accessed through the DOM with
`document.body.style.backgroundColor`.
