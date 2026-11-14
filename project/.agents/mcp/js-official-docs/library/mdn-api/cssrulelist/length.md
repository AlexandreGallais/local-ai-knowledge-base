---
title: "CSSRuleList: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssrulelist/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSRuleList: length property

The **`length`** property of the `CSSRuleList` interface returns the number of `CSSRule` objects in the list.

## Value

An integer.

## Examples

In the following example the number of items in the `CSSRuleList` named `myRules` is printed to the console.

```js
let myRules = document.styleSheets[0].cssRules;
console.log(myRules.length);
```
