---
title: "StyleSheet: parentStyleSheet property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylesheet/parentstylesheet/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StyleSheet: parentStyleSheet property

The **`parentStyleSheet`** read-only property of the `StyleSheet` interface returns the style sheet, if any, that is including the given style sheet.

## Value

A `StyleSheet` object.

## Examples

```js
// Find the top level stylesheet
const sheet = stylesheet.parentStyleSheet ?? stylesheet;
```

## Notes

This property returns `null` if the current stylesheet is a top-level
stylesheet or if stylesheet inclusion is not supported.
