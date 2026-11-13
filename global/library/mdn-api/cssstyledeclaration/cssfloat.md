---
title: "CSSStyleDeclaration: cssFloat property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstyledeclaration/cssfloat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleDeclaration: cssFloat property

The **`cssFloat`** property of the `CSSStyleDeclaration` interface returns the result of invoking `CSSStyleDeclaration.getPropertyValue()` with `float` as an argument.

When setting, it invokes `CSSStyleDeclaration.setProperty()` with `float` as the first argument, and the given value as the second argument. The given value must be a valid value for the `float` property.

## Value

A string.

When set to the `null` value, that `null` value is converted to the empty string (`""`), so `csd.cssFloat = null` is equivalent to `csd.cssFloat = ""`.

## Example

In the below example, the stylesheet contains a single rule for `.box`, which has the `float` property with a value of `left`. This value will be returned by `cssFloat`. We then set the value to "right" using `cssFloat`, and return the new value.

```css
.box {
  float: left;
  inline-size: 300px;
}
```

```js
let myRules = document.styleSheets[0].cssRules;
let rule = myRules[0];
console.log(rule.style.cssFloat); // "left"
rule.style.cssFloat = "right";
console.log(rule.style.cssFloat); // "right"
```
