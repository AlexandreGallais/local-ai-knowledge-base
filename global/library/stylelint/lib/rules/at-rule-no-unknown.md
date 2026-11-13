---
title: "at-rule-no-unknown"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/at-rule-no-unknown/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# at-rule-no-unknown

Disallow unknown at-rules.

```css
    @unknown (max-width: 960px) {}
/** ↑
 * At-rules like this */
```

Use this rule to avoid mistyped at-rules, e.g. `@keyframe`. Browsers ignore unknown at-rules along with everything inside.

This rule considers at-rules defined in the CSS Specifications, up to and including Editor's Drafts, to be known.

For customizing syntax, see the `languageOptions` section.

This rule supports 1 message argument: the unknown at-rule.

## Options

### `true`

```json
{
  "at-rule-no-unknown": true
}
```

The following patterns are considered problems:

```css
@unknown {}
```

The following patterns are _not_ considered problems:

```css
@media (max-width: 960px) {}
```

```css
@font-feature-values Font One {
  @styleset {}
}
```

## Optional secondary options

### `ignoreAtRules`

```json
{ "ignoreAtRules": ["array", "of", "at-rules", "/regex/"] }
```

Given:

```json
{
  "at-rule-no-unknown": [true, { "ignoreAtRules": ["/^--my-/", "--custom"] }]
}
```

The following patterns are _not_ considered problems:

```css
@--my-at-rule "x.css";
```

```css
@--my-other-at-rule {}
```

```css
@--custom {}
```
