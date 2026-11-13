---
title: "CSSStyleSheet: cssRules property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstylesheet/cssrules/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleSheet: cssRules property

The read-only `CSSStyleSheet` property
**`cssRules`** returns a live `CSSRuleList` which
provides a real-time, up-to-date list of every CSS rule which comprises the
stylesheet. Each item in the list is a `CSSRule` defining a single
rule.

## Value

A live-updating `CSSRuleList` containing each of the CSS rules making up
the stylesheet. Each entry in the rule list is a `CSSRule` object
describing one rule making up the stylesheet.

## Examples

Individual rules within the stylesheet can then be accessed by index:

```js
const ruleList = document.styleSheets[0].cssRules;

for (let i = 0; i < ruleList.length; i++) {
  processRule(ruleList[i]);
}
```

Rules can also be accessed using `for...of`:

```js
const ruleList = document.styleSheets[0].cssRules;

for (const rule of ruleList) {
  processRule(rule);
}
```

However, because `CSSRule` is not a proper array, you can't use
`forEach()`.

## See also

- CSS Object Model
- Using dynamic styling information
