---
title: "CSSKeyframeRule: style property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csskeyframerule/style/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSKeyframeRule: style property

The read-only **`style`** property of the `CSSKeyframeRule` interface contains a `CSSStyleDeclaration` object representing the descriptors available in the `@keyframes` rule's body.

## Value

A `CSSStyleDeclaration` object.

Although the `style` property itself is read-only in the sense that you can't replace the `CSSStyleDeclaration` object, you can still assign to the `style` property directly, which is equivalent to assigning to its `cssText` property. You can also modify the `CSSStyleDeclaration` object using the `setProperty()` and `removeProperty()` methods.

## Examples

The CSS includes a `@keyframes` at-rule. This will be the first `CSSRule` returned by `document.styleSheets[0].cssRules`.
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
console.log(keyframes[0].style); // a CSSStyleDeclaration
```
