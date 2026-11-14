---
title: "CSSCounterStyleRule: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csscounterstylerule/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSCounterStyleRule: name property

The **`name`** property of the `CSSCounterStyleRule` interface gets and sets the `<custom-ident>` defined as the `name` for the associated rule.

## Value

A string.

## Examples

The following example shows a `@counter-style` rule. In JavaScript, `myRules[0]` is this `@counter-style` rule, returning `name` gives us the custom ident "box-corner".

```css
@counter-style box-corner {
  system: fixed;
  symbols: ◰ ◳ ◲ ◱;
  suffix: ": ";
  fallback: disc;
}
```

```js
let myRules = document.styleSheets[0].cssRules;
console.log(myRules[0].name); // "box-corner"
```
