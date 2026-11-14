---
title: "CSSPropertyRule: initialValue property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csspropertyrule/initialvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPropertyRule: initialValue property

The read-only **`initialValue`** nullable property of the `CSSPropertyRule` interface returns the initial value of the custom property registration represented by the `@property` rule, controlling the property's initial value.

## Value

A string which is a `<declaration-value>`.

## Examples

This stylesheet contains a single `@property` rule. The first `CSSRule` returned will be a `CSSPropertyRule` representing this rule. The `initialValue` property returns the string `"#c0ffee"` this being the value of the `initial-value` property in the CSS.

```css
@property --property-name {
  syntax: "<color>";
  inherits: false;
  initial-value: #c0ffee;
}
```

```js
const myRules = document.styleSheets[0].cssRules;
console.log(myRules[0].initialValue); // "#c0ffee"
```
