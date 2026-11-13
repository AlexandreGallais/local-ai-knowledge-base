---
title: "CSSRule: cssText property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssrule/csstext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSRule: cssText property

The **`cssText`** property of the `CSSRule`
interface returns the actual text of a `CSSStyleSheet` style-rule.

> **Note:**
> Do not confuse this property with element-style
> `CSSStyleDeclaration.cssText`.

Be aware that this property used to be mutable but is now read-only. Attempting to
set it _does absolutely nothing_, and doesn't even emit a warning or error.
Furthermore, it has no settable sub-properties. Therefore, to modify it, use the
stylesheet's `cssRules[index]` properties
`.selectorText` and
`.style` (or its sub-properties). See Using dynamic styling information for details.

## Value

A string containing the actual text of the `CSSStyleSheet` rule.

## Examples

```css
body {
  background-color: darkblue;
}
```

```js
let stylesheet = document.styleSheets[0];
console.log(stylesheet.cssRules[0].cssText); // body { background-color: darkblue; }
```
