---
title: "CSSRule: parentStyleSheet property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssrule/parentstylesheet/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSRule: parentStyleSheet property

The **`parentStyleSheet`** read-only property of the `CSSRule` interface returns the `StyleSheet` object in which the current rule is defined.

## Value

A `StyleSheet` object.

## Examples

```js
const docRules = document.styleSheets[0].cssRules;
console.log(docRules[0].parentStyleSheet === document.styleSheets[0]); // returns true
```
