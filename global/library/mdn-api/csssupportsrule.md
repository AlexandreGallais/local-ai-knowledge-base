---
title: "CSSSupportsRule"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csssupportsrule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSSupportsRule

The **`CSSSupportsRule`** interface represents a single CSS `@supports` at-rule.

## Instance properties

_Inherits properties from its ancestors `CSSConditionRule`, `CSSGroupingRule`, and `CSSRule`._

## Instance methods

_Inherits methods from its ancestors `CSSConditionRule`, `CSSGroupingRule`, and `CSSRule`._

## Examples

The CSS includes a CSS feature query using the `@supports` at-rule, containing one style rule. This will be the first CSSRule returned by `document.styleSheets[0].cssRules`.
`myRules[0]` therefore returns a `CSSSupportsRule` object.

```css
@supports (display: grid) {
  body {
    color: blue;
  }
}
```

```js
let myRules = document.styleSheets[0].cssRules;
console.log(myRules[0]); // a CSSSupportsRule representing the feature query.
```

## See also

- `@supports`
