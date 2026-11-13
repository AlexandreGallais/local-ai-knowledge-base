---
title: "CSSPositionTryRule: style property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csspositiontryrule/style/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPositionTryRule: style property

The read-only **`style`** property of the `CSSPositionTryRule` interface contains a `CSSPositionTryDescriptors` object representing the descriptors available in the `@position-try` rule's body.

## Value

A `CSSPositionTryDescriptors` object.

Although the `style` property itself is read-only in the sense that you can't replace the `CSSPositionTryDescriptors` object, you can still assign to the `style` property directly, which is equivalent to assigning to its `cssText` property. You can also modify the `CSSPositionTryDescriptors` object using the `setProperty()` and `removeProperty()` methods.

## Examples

The CSS includes a `@position-try` at-rule with a name of `--custom-right` and three descriptors.

```css
@position-try --custom-bottom {
  top: anchor(bottom);
  min-width: 100px;
  margin-top: 10px;
}
```

```js
const myRules = document.styleSheets[0].cssRules;
const tryOption = myRules[0]; // a CSSPositionTryRule
console.log(tryOption.style.top); // "anchor(bottom)"
console.log(tryOption.style["min-width"]); // "100px"
console.log(tryOption.style.positionArea); // ""; no position-area specified
```

## See also

- `CSSPositionTryDescriptors`
- `@position-try`
- `position-try-fallbacks`
- CSS anchor positioning module
- Using CSS anchor positioning
- Handling overflow: try options and conditional hiding
