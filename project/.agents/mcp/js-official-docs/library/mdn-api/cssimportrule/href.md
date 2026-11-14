---
title: "CSSImportRule: href property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssimportrule/href/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSImportRule: href property

The read-only **`href`** property of the
`CSSImportRule` interface returns the URL specified by the
`@import` at-rule.

The resolved URL will be the `href` attribute of the
associated stylesheet.

## Value

A string.

## Examples

The following stylesheet includes a single `@import` rule. Therefore the
first item in the list of CSS rules will be a `CSSImportRule`. The
`href` property returns the URL of the imported stylesheet.

```css
@import "style.css" screen;
```

```js
const myRules = document.styleSheets[0].cssRules;
console.log(myRules[0].href); // 'style.css'
```
