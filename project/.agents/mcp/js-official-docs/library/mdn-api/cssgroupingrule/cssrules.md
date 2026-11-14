---
title: "CSSGroupingRule: cssRules property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssgroupingrule/cssrules/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSGroupingRule: cssRules property

The **`cssRules`** property of the
`CSSGroupingRule` interface returns a `CSSRuleList` containing
a collection of `CSSRule` objects.

## Value

a `CSSRuleList`.

## Examples

```js
let myRules = document.styleSheets[0].cssRules;
console.log(myRules);
```
