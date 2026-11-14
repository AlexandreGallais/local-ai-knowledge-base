---
title: "CSSPropertyRule: syntax property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csspropertyrule/syntax/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPropertyRule: syntax property

The read-only **`syntax`** property of the `CSSPropertyRule` interface returns the literal syntax of the custom property registration represented by the `@property` rule, controlling how the property's value is parsed at computed-value time.

## Value

A string.

## Examples

This stylesheet contains a single `@property` rule. The first `CSSRule` returned will be a `CSSPropertyRule` representing this rule. The `syntax` property returns the literal string `"<color>"`.

```css
@property --property-name {
  syntax: "<color>";
  inherits: false;
  initial-value: #c0ffee;
}
```

```js
const myRules = document.styleSheets[0].cssRules;
console.log(myRules[0].syntax); // "<color>"
```
