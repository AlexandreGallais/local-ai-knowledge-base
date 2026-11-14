---
title: "CSSKeyframesRule: appendRule() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csskeyframesrule/appendrule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSKeyframesRule: appendRule() method

The **`appendRule()`** method of the `CSSKeyframeRule` interface appends a `CSSKeyFrameRule` to the end of the rules.

## Syntax

```js
appendRule(rule)
```

### Parameters

- `rule`
    A string containing a keyframe rule.

### Return value

None (`undefined`).

## Examples

The CSS includes a keyframes at-rule. This will be the first `CSSRule` returned by `document.styleSheets[0].cssRules`.
`myRules[0]` returns a `CSSKeyframesRule` object. Returning the `cssRules` property would return a `CSSRuleList` containing one rule.

After appending another rule with `appendRule` the `cssRules` property returns a `CSSRuleList` containing two rules.

```css
@keyframes slide-in {
  from {
    transform: translateX(0%);
  }
}
```

```js
let myRules = document.styleSheets[0].cssRules;
let keyframes = myRules[0]; // a CSSKeyframesRule
keyframes.appendRule("to {transform: translateX(100%);}");
console.log(keyframes.cssRules); // a CSSRuleList object with two rules
```
