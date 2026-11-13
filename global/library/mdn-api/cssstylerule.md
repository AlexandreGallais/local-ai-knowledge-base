---
title: "CSSStyleRule"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstylerule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleRule

The **`CSSStyleRule`** interface represents a single CSS style rule.

## Instance properties

_Inherits properties from its ancestors `CSSGroupingRule` and `CSSRule`._

- `CSSStyleRule.selectorText`
    Returns the textual representation of the selector for this rule, e.g., `"h1, h2"`.
- `CSSStyleRule.style` (read-only)
    Returns the `CSSStyleProperties` object for the rule, which represents its styles.
- `CSSStyleRule.styleMap` (read-only)
    Returns a `StylePropertyMap` object which provides access to the rule's property-value pairs.

## Instance methods

_Inherits methods from its ancestors `CSSGroupingRule` and `CSSRule`._

## Examples

### Getting a style rule

The CSS below defines the style rule for the `h1` selector, which is represented in code by a `CSSStyleRule` instance.

```css
h1 {
  color: pink;
}
```

Assuming the above style rule is the first rule in the document, it will be the first `CSSRule` returned by `document.styleSheets[0].cssRules`.
`myRules[0].style` returns a `CSSStyleProperties` object representing the declarations defined for `h1`.

```js
let myRules = document.styleSheets[0].cssRules;
console.log(myRules[0]); // a CSSStyleRule representing the h1.
```
