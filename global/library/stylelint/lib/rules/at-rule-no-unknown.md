---
title: "at-rule-no-unknown"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/at-rule-no-unknown/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# at-rule-no-unknown

Disallow unknown at-rules.

```css
    @unknown (max-width: 960px) {}
/** ↑
 * At-rules like this */
```

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
