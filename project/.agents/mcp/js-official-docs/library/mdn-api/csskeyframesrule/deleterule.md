---
title: "CSSKeyframesRule: deleteRule() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csskeyframesrule/deleterule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSKeyframesRule: deleteRule() method

The **`deleteRule()`** method of the `CSSKeyframeRule` interface deletes the `CSSKeyFrameRule` that matches the specified keyframe selector.

## Syntax

```js
deleteRule(select)
```

### Parameters

- `select`
    A string which contains the keyframe selector of the rule to be deleted, which must be:
    - a comma-separated list of percentage values between 0% and 100%;
    - or, the keywords `from` or `to`

    Note that the number and order of the values in the specified keyframe selector must match those of the targeted keyframe rule(s). White-space is disregarded.

### Return value

None (`undefined`).

## Examples

The CSS includes a keyframes at-rule. This will be the first `CSSRule` returned by `document.styleSheets[0].cssRules`.
`myRules[0]` returns a `CSSKeyframesRule` object. Returning the `cssRules` property would return a `CSSRuleList` containing two rules.

After deleting a rule with `deleteRule()` the `cssRules` property returns a `CSSRuleList` containing one rule.

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
keyframes.deleteRule("to");
console.log(keyframes.cssRules); // a CSSRuleList object with one rule
```
