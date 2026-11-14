---
title: "CSSKeyframesRule: cssRules property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csskeyframesrule/cssrules/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSKeyframesRule: cssRules property

The read-only **`cssRules`** property of the `CSSKeyframeRule` interface returns a `CSSRuleList` containing the rules in the keyframes at-rule.

> **Note:**
> The `CSSKeyframeRule` itself is indexable like an array, and functions similarly to its `cssRules` property.

## Value

A `CSSRuleList`.

## Examples

The CSS includes a keyframes at-rule. This will be the first `CSSRule` returned by `document.styleSheets[0].cssRules`.
`myRules[0]` returns a `CSSKeyframesRule` object. The `cssRules` property returns a `CSSRuleList` containing two rules.

```css
@keyframes slide-in {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(100%);
  }
}
```

```js
let myRules = document.styleSheets[0].cssRules;
let keyframes = myRules[0]; // a CSSKeyframesRule
console.log(keyframes.cssRules); // a CSSRuleList object with two rules
```
