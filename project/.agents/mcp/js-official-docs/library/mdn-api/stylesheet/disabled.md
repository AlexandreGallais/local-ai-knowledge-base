---
title: "StyleSheet: disabled property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylesheet/disabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StyleSheet: disabled property

The **`disabled`** property of the
`StyleSheet` interface determines whether the style sheet is prevented from
applying to the document.

A style sheet may be disabled by manually setting this property to `true` or
if it's an inactive alternative style sheet. Note that `disabled === false` does not guarantee the style
sheet is applied (it could be removed from the document, for instance).

## Value

A boolean.

## Examples

```js
// If the stylesheet is disabled
if (stylesheet.disabled) {
  // Apply styles in-line
}
```
