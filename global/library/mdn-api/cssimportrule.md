---
title: "CSSImportRule"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssimportrule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSImportRule

The **`CSSImportRule`** interface represents an `@import` at-rule.

## Instance properties

_Inherits properties from its ancestor `CSSRule`._

- `CSSImportRule.href` (read-only)
    Returns the URL specified by the `@import` rule.
- `CSSImportRule.layerName` (read-only)
    Returns the name of the cascade layer declared in the `@import` rule, the empty string if the layer is anonymous, the or `null` if the rule doesn't declare any.
- `CSSImportRule.media`
    Returns the value of the `media` attribute of the associated stylesheet.
- `CSSImportRule.styleSheet` (read-only)
    Returns the associated stylesheet.
- `CSSImportRule.supportsText` (read-only)
    Returns the supports condition specified by the `@import` rule.

## Instance methods

_Inherits methods from its ancestor `CSSRule`._

## Examples

The document includes a single stylesheet which contains a single `@import` rule. Therefore the first item in the list of CSS rules will be a `CSSImportRule`.

```css
@import "style.css" screen;
```

```js
const myRules = document.styleSheets[0].cssRules;
console.log(myRules[0]); // A CSSImportRule instance object
```
