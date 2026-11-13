---
title: "CSSStyleSheet: ownerRule property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstylesheet/ownerrule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleSheet: ownerRule property

The read-only `CSSStyleSheet` property
**`ownerRule`** returns the `CSSImportRule`
corresponding to the `@import` at-rule which imported the stylesheet into
the document. If the stylesheet wasn't imported into the document using
`@import`, the returned value is `null`.

## Value

A `CSSImportRule` corresponding to the `@import` rule which
imported the stylesheet into the document. If the stylesheet wasn't imported into the
document using `@import`, the returned value is `null`.

## Examples

This snippet of code looks for rules which were not imported into the document using an
`@import` at-rule.

```js
const ruleList = document.styleSheets[0].cssRules;

for (const rule of ruleList) {
  if (!rule.ownerRule) {
    /* rule is not imported */
  }
}
```

This snippet obtains a reference to the stylesheet associated with the
`@import` and processes it in some manner:

```js
const ruleList = document.styleSheets[0].cssRules;

for (const rule of ruleList) {
  if (rule.ownerRule) {
    checkStylesheet(rule.ownerRule.styleSheet);
  }
}
```

## See also

- CSS Object Model
- Using dynamic styling information
