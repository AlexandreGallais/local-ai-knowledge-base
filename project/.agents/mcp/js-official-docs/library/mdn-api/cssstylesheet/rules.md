---
title: "CSSStyleSheet: rules property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstylesheet/rules/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleSheet: rules property

The **`rules`** read-only property of the `CSSStyleSheet` interface is a _deprecated_ _legacy property_. Functionally identical to the preferred `cssRules` property, it provides access to a live-updating list of the CSS rules comprising the stylesheet.

> **Note:**
> As a legacy property, you should not use `rules` and
> should instead use the preferred `cssRules`.
> While `rules` is unlikely to be removed soon, its availability is not as
> widespread and using it will result in compatibility problems for your site or app.

## Value

A live-updating `CSSRuleList` containing each of the CSS rules making up
the stylesheet. Each entry in the rule list is a `CSSRule` object
describing one rule making up the stylesheet.

## See also

- CSS Object Model
- Using dynamic styling information
