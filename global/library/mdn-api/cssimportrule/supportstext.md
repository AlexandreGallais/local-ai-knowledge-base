---
title: "CSSImportRule: supportsText property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssimportrule/supportstext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSImportRule: supportsText property

The read-only **`supportsText`** property of the `CSSImportRule` interface returns the supports condition specified by the `@import` at-rule.

## Value

A string, or `null`.

## Examples

The document's single stylesheet contains three `@import` rules. The first declaration imports a stylesheet if `display: flex` is supported. The second declaration imports a stylesheet if the `:has` selector is supported. The third declaration imports a stylesheet without a supports condition.

The `supportsText` property returns the import conditions associated with the at-rule.

```css
@import "style1.css" supports(display: flex);
@import "style2.css" supports(selector(p:has(a)));
@import "style3.css";
```

```js
const myRules = document.styleSheets[0].cssRules;
console.log(myRules[0].supportsText); // returns `"display: flex"`
console.log(myRules[1].supportsText); // returns `"selector(p:has(a))"`
console.log(myRules[2].supportsText); // returns `null`
```

## See also

- Using feature queries
- `@import` and `@supports`
