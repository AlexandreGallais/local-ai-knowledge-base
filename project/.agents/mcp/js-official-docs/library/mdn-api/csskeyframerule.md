---
title: "CSSKeyframeRule"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csskeyframerule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSKeyframeRule

The **`CSSKeyframeRule`** interface describes an object representing a set of styles for a given keyframe. It corresponds to the contents of a single keyframe of a `@keyframes` at-rule.

## Instance properties

_Inherits properties from its ancestor `CSSRule`._

- `CSSKeyframeRule.keyText`
    Represents the key of the keyframe, like `'10%'`, `'75%'`. The `from` keyword maps to `'0%'` and the `to` keyword maps to `'100%'`.
- `CSSKeyframeRule.style` (read-only)
    Returns a `CSSStyleDeclaration` of the CSS style associated with the keyframe.

## Instance methods

_No specific methods; inherits methods from its ancestor `CSSRule`._

## Examples

The CSS includes a keyframes at-rule. This will be the first `CSSRule` returned by `document.styleSheets[0].cssRules`.
`myRules[0]` returns a `CSSKeyframesRule` object, which will contain individual `CSSKeyFrameRule` objects for each keyframe.

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
console.log(keyframes[0]); // a CSSKeyframeRule representing an individual keyframe.
```

## See also

- `@keyframes`
- `CSSKeyFramesRule`
