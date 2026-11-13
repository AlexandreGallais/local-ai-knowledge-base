---
title: "CSSCounterStyleRule: additiveSymbols property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csscounterstylerule/additivesymbols/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSCounterStyleRule: additiveSymbols property

The **`additiveSymbols`** property of the `CSSCounterStyleRule` interface gets and sets the value of the `additive-symbols` descriptor. If the descriptor does not have a value set, this attribute returns an empty string.

## Value

A string.

## Examples

The following example shows a `@counter-style` rule. In JavaScript, `myRules[0]` is this `@counter-style` rule, returning `additiveSymbols` gives us the value " V 5, IV 4, I 1".

```css
@counter-style additive-symbols-example {
  system: additive;
  additive-symbols:
    V 5,
    IV 4,
    I 1;
}
```

```js
let myRules = document.styleSheets[0].cssRules;
console.log(myRules[0].additiveSymbols); // " V 5, IV 4, I 1"
```
