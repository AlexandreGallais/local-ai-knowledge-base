---
title: "CSSRule: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssrule/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSRule: type property

The read-only **`type`** property of the
`CSSRule` interface is a deprecated property that returns an integer
indicating which type of rule the `CSSRule` represents.

If you need to distinguish different types of CSS rule, a good alternative is to use `constructor.name`:

```js
const sheets = Array.from(document.styleSheets);
const rules = sheets.map((sheet) => Array.from(sheet.cssRules)).flat();

for (const rule of rules) {
  console.log(rule.constructor.name);
}
```

## Value

- `CSSRule.STYLE_RULE` (`1`)
    The rule is a `CSSStyleRule`, the most common kind of rule: `selector { prop1: val1; prop2: val2; }`.
- `CSSRule.IMPORT_RULE` (`3`)
    The rule is a `CSSImportRule` and represents an `@import` rule.
- `CSSRule.MEDIA_RULE` (`4`)
    The rule is a `CSSMediaRule`.
- `CSSRule.FONT_FACE_RULE` (`5`)
    The rule is a `CSSFontFaceRule`
- `CSSRule.PAGE_RULE` (`6`)
    The rule is a `CSSPageRule`.
- `CSSRule.KEYFRAMES_RULE` (`7`)
    The rule is a `CSSKeyframesRule`.
- `CSSRule.KEYFRAME_RULE` (`8`)
    The rule is a `CSSKeyframeRule`.
- `CSSRule.MARGIN_RULE` (`9`)
    The rule is a `CSSMarginRule`.
- `CSSRule.NAMESPACE_RULE` (`10`)
    The rule is a `CSSNamespaceRule`.
- `CSSRule.COUNTER_STYLE_RULE` (`11`)
    The rule is a `CSSCounterStyleRule`.
- `CSSRule.SUPPORTS_RULE` (`12`)
    The rule is a `CSSSupportsRule`.
- `CSSRule.FONT_FEATURE_VALUES_RULE` (`14`)
    The rule is a `CSSFontFeatureValuesRule`.

The values `CSSRule.UNKNOWN_RULE` (`0`), `CSSRule.CHARSET_RULE` (`2`), `CSSRule.DOCUMENT_RULE` (`13`), `CSSRule.VIEWPORT_RULE` (`14`), and `CSSRule.REGION_STYLE_RULE` (`16`) cannot be obtained anymore.

## Examples

```js
const rules = document.styleSheets[0].cssRules;
console.log(rules[0].type);
```
