---
title: "CSSCounterStyleRule: suffix property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csscounterstylerule/suffix/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSCounterStyleRule: suffix property

The **`suffix`** property of the `CSSCounterStyleRule` interface gets and sets the value of the `suffix` descriptor. If the descriptor does not have a value set, this attribute returns an empty string.

## Value

A string.

## Examples

The following example shows a `@counter-style` rule. In JavaScript, `myRules[0]` is this `@counter-style` rule, returning `suffix` gives us the value ": ".

```css
@counter-style box-corner {
  system: fixed;
  symbols: ◰ ◳ ◲ ◱;
  suffix: ": ";
  negative: "-";
}
```

```js
let myRules = document.styleSheets[0].cssRules;
console.log(myRules[0].suffix); // ": "
```
