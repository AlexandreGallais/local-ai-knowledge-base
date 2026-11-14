---
title: "CSSPropertyRule: inherits property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csspropertyrule/inherits/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPropertyRule: inherits property

The read-only **`inherits`** property of the `CSSPropertyRule` interface returns the inherit flag of the custom property registration represented by the `@property` rule, a boolean describing whether or not the property inherits by default.

## Value

A boolean.

## Examples

This stylesheet contains a single `@property` rule. The first `CSSRule` returned will be a `CSSPropertyRule` representing this rule. The `inherits` property returns the boolean `false`, this being the value of the `inherits` property in the CSS.

```css
@property --property-name {
  syntax: "<color>";
  inherits: false;
  initial-value: #c0ffee;
}
```

```js
const myRules = document.styleSheets[0].cssRules;
console.log(myRules[0].inherits); // false
```
