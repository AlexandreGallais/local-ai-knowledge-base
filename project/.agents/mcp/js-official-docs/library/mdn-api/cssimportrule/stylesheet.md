---
title: "CSSImportRule: styleSheet property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssimportrule/stylesheet/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSImportRule: styleSheet property

The read-only **`styleSheet`** property of the
`CSSImportRule` interface returns the CSS Stylesheet specified by the
`@import` at-rule. This will be
in the form of a `CSSStyleSheet` object.

An `@import` at-rule always has
an associated stylesheet.

## Value

A `CSSStyleSheet`.

## Examples

The following stylesheet includes a single `@import` rule. Therefore the
first item in the list of CSS rules will be a `CSSImportRule`. The
`styleSheet` property returns the imported stylesheet.

```css
@import "style.css" screen;
```

```js
const myRules = document.styleSheets[0].cssRules;
console.log(myRules[0].styleSheet); // A CSSStyleSheet
```
