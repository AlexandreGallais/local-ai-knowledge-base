---
title: "CSSKeyframesRule: findRule() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csskeyframesrule/findrule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSKeyframesRule: findRule() method

The **`findRule()`** method of the `CSSKeyframeRule` interface finds the `CSSKeyFrameRule` that matches the specified keyframe selector.

## Syntax

```js
findRule(select)
```

### Parameters

- `select`
    A string which contains the keyframe selector of the rule to be found, which must be:
    - a comma-separated list of percentage values between 0% and 100%;
    - or, the keywords `from` or `to`

    Note that the number and order of the values in the specified keyframe selector must match those of the targeted keyframe rule(s). White-space is disregarded.

### Return value

A `CSSKeyframeRule` which is the last matching rule. If no rules are found, nothing is returned.

## Examples

The CSS includes a keyframes at-rule. This will be the first `CSSRule` returned by `document.styleSheets[0].cssRules`.
`myRules[0]` returns a `CSSKeyframesRule` object. Calling findRule("to") returns a `CSSKeyframeRule` representing the second rule.

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
console.log(keyframes.findRule("to")); // a CSSKeyframeRule object
```
