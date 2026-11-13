---
title: "at-rule-descriptor-value-no-unknown"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/at-rule-descriptor-value-no-unknown/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# at-rule-descriptor-value-no-unknown

Disallow unknown values for descriptors within at-rules.

```css
@counter-style foo {
  system: unknown;
/**       ↑
 * Values like this */
}
```

Use this rule to avoid values unknown to their descriptor. Browsers ignore them, so the at-rule behaves as if the descriptor were missing.

This rule considers descriptors and values defined in the CSS Specifications, up to and including Editor's Drafts, to be known.

You can filter the CSSTree Syntax Reference to find out what values are known for a descriptor of an at-rule, and use the `languageOptions` configuration property to extend it.

This rule checks descriptor values within at-rules. You can use `declaration-property-value-no-unknown` to disallow unknown values for properties within declarations, and `at-rule-descriptor-no-unknown` to disallow unknown descriptors for at-rules.

> **Warning:**
> This rule is only appropriate for CSS. You should not turn it on for CSS-like languages, such as SCSS or Less.

> **Note:**
> When using this rule, we recommend turning off these overlapping rules or configuring them to ignore the overlaps:
>
> - `color-no-invalid-hex`
> - `function-linear-gradient-no-nonstandard-direction`
> - `function-no-unknown`
> - `string-no-newline`
> - `unit-no-unknown`

This rule supports 2 message arguments: the descriptor and the unknown value.

Prior art:

- stylelint-csstree-validator

## Options

### `true`

```json
{
  "at-rule-descriptor-value-no-unknown": true
}
```

The following patterns are considered problems:

```css
@counter-style foo {
  system: unknown;
}
```

```css
@property --foo {
  syntax: unknown;
}
```

The following patterns are _not_ considered problems:

```css
@counter-style foo {
  system: numeric;
}
```

```css
@property --foo {
  syntax: "<color>";
}
```
