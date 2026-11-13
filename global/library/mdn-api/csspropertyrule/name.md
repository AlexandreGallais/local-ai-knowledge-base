---
title: "CSSPropertyRule: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csspropertyrule/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPropertyRule: name property

The read-only **`name`** property of the `CSSPropertyRule` interface represents the property name, this being the serialization of the name given to the custom property in the `@property` rule's prelude.

## Value

A string.

## Examples

This stylesheet contains a single `@property` rule. The first `CSSRule` returned will be a `CSSPropertyRule` representing this rule. The `name` property returns the string `"--property-name"`, which is the name given to the custom property in CSS.

```css
@property --property-name {
  syntax: "<color>";
  inherits: false;
  initial-value: #c0ffee;
}
```

```js
const myRules = document.styleSheets[0].cssRules;
console.log(myRules[0].name); // "--property-name"
```
