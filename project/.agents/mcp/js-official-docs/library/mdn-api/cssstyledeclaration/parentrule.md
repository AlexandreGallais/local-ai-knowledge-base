---
title: "CSSStyleDeclaration: parentRule property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstyledeclaration/parentrule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleDeclaration: parentRule property

The **CSSStyleDeclaration.parentRule** read-only
property returns a `CSSRule` that is the parent of this style
block, e.g., a `CSSStyleRule` representing the style for a CSS
selector.

## Value

The CSS rule that contains this declaration block or `null` if this
`CSSStyleDeclaration` is not attached to a `CSSRule`.

## Examples

The following JavaScript code gets the parent CSS style rule from a
`CSSStyleDeclaration`:

```js
const declaration = document.styleSheets[0].rules[0].style;
const rule = declaration.parentRule;
```
