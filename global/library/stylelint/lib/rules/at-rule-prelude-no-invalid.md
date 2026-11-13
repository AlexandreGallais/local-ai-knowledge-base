---
title: "at-rule-prelude-no-invalid"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/at-rule-prelude-no-invalid/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# at-rule-prelude-no-invalid

Disallow invalid preludes for at-rules.

```css
@property --foo {}
/**       ↑
 * Preludes like this */
```

This rule considers preludes for at-rules defined within the CSS specifications, up to and including Editor's Drafts, to be valid.

You can filter the CSSTree Syntax Reference to find out what preludes are valid for an at-rule, and use the `languageOptions` configuration property to extend it.

> **Warning:**
> This rule is only appropriate for CSS. You should not turn it on for CSS-like languages, such as SCSS or Less.

> **Note:**
> When using this rule, we recommend turning off these overlapping rules or configuring them to ignore the overlaps:
>
> - `media-query-no-invalid`
> - `string-no-newline`
> - `unit-no-unknown`

This rule supports 2 message arguments: the at-rule and the invalid prelude.

Prior art:

- stylelint-csstree-validator

## Options

### `true`

```json
{
  "at-rule-prelude-no-invalid": true
}
```

The following patterns are considered problems:

```css
@property foo {}
```

```css
@font-palette-values foo {}
```

The following patterns are _not_ considered problems:

```css
@property --foo {}
```

```css
@font-palette-values --foo {}
```

## Optional secondary options

### `ignoreAtRules`

```json
{ "ignoreAtRules": ["array", "of", "at-rules", "/regex/"] }
```

Given:

```json
{
  "at-rule-prelude-no-invalid": [
    true,
    { "ignoreAtRules": ["property", "/^font-/"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
@property foo;
```

```css
@font-palette-values foo {}
```
