---
title: "Document: linkColor property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/linkcolor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: linkColor property

The **`Document.linkColor`** property gets/sets the color of
links within the document.

This property is deprecated. As an alternative, you can set the CSS
`color` property on either HTML anchor links (``) or on
`:link` pseudo-classes.

## Value

A string representing the color as a word (e.g., `red`) or hexadecimal value (e.g., `#ff0000`).

When set to the `null` value, that `null` value is converted to the empty string (`""`), so `document.linkColor = null` is equivalent to `document.linkColor = ""`.

## Examples

```js
document.linkColor = "blue";
```

## Browser compatibility

The default value for this property in Mozilla Firefox is blue (`#0000ee` in
hexadecimal).

## See also

- `document.vlinkColor`
- `document.alinkColor`
