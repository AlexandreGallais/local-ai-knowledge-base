---
title: "CSSKeyframesRule: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csskeyframesrule/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSKeyframesRule: length property

The read-only **`length`** property of the `CSSKeyframesRule` interface returns the number of `CSSKeyframeRule` objects in its list. You can then access each keyframe rule by its index directly on the `CSSKeyframeRule` object.

## Value

A non-negative integer. It should have the same value as the `length` of the `cssRules` property.

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
const myRules = document.styleSheets[0].cssRules;
const keyframes = myRules[0]; // a CSSKeyframesRule
console.log(keyframes.length); // 2
```
