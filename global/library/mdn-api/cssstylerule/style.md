---
title: "CSSStyleRule: style property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstylerule/style/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleRule: style property

The read-only **`style`** property of the `CSSStyleRule` interface contains a `CSSStyleProperties` object representing the properties list in this style rule's body.

Each CSS property supported by the browser is present on the object.
The properties that are not defined inline in the corresponding CSS declaration are set to the empty string (`""`).

## Value

A `CSSStyleProperties` object.

> **Note:**
> Earlier versions of the specification returned a `CSSStyleDeclaration`, which is now the base class of `CSSStyleProperties`.
> See the browser compatibility table for browser support information.

Although the `style` property itself is read-only in the sense that you can't replace the `CSSStyleProperties` object, you can still assign to the `style` property directly, which is equivalent to assigning to its `cssText` property. You can also modify the `CSSStyleProperties` object using the `setProperty()` and `removeProperty()` methods.

## Examples

### Getting the styles for a style rule

The CSS below defines the style rule for the `h1` selector, which is represented in code by a `CSSStyleRule` instance.
The declaration block is that part of the style rule that appears within the braces and that actually provides the style definitions (for the selector, the part that comes before the braces), which is represented in code by the `style` property.

```css
h1 {
  color: pink;
}
```

Assuming the above style rule is the first rule in the document, it will be the first `CSSRule` returned by `document.styleSheets[0].cssRules`.
`myRules[0].style` returns a `CSSStyleProperties` object representing the declarations defined for `h1`.

```js
const myRules = document.styleSheets[0].cssRules;
console.log(myRules[0].style); // a CSSStyleProperties representing the declarations on the h1.
```
