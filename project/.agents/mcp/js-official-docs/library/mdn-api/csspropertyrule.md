---
title: "CSSPropertyRule"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csspropertyrule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPropertyRule

The **`CSSPropertyRule`** interface of the CSS Properties and Values API represents a single CSS `@property` rule.

## Instance properties

_Inherits properties from its ancestor `CSSRule`._

- `CSSPropertyRule.inherits` (read-only)
    Returns the inherit flag of the custom property.
- `CSSPropertyRule.initialValue` (read-only)
    Returns the initial value of the custom property.
- `CSSPropertyRule.name` (read-only)
    Returns the name of the custom property.
- `CSSPropertyRule.syntax` (read-only)
    Returns the literal syntax of the custom property.

## Instance methods

_No specific methods; inherits methods from its ancestor `CSSRule`._

## Examples

This stylesheet contains a single `@property` rule. The first `CSSRule` returned will be a `CSSPropertyRule` with the properties and values as defined by the rule in CSS.

```css
@property --property-name {
  syntax: "<color>";
  inherits: false;
  initial-value: #c0ffee;
}
```

```js
const myRules = document.styleSheets[0].cssRules;
console.log(myRules[0]); // A CSSPropertyRule
```
