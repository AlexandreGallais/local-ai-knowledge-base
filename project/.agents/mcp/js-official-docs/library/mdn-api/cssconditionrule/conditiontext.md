---
title: "CSSConditionRule: conditionText property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssconditionrule/conditiontext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSConditionRule: conditionText property

The read-only **`conditionText`** property of
the `CSSConditionRule` interface returns or sets the text of the CSS
rule.

## Value

A string.

## Examples

The following example demonstrates reading the value of
`conditionText` on a `CSSMediaRule` which implements the
`CSSConditionRule` interface.

```css
@media (width >= 500px) {
  body {
    color: blue;
  }
}
```

```js
const targetRule = document.styleSheets[0].cssRules[0];
console.log(targetRule.conditionText); // "(width >= 500px)"
```

## See also

- Using dynamic styling information
