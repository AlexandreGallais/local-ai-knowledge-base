---
title: "at-rule-descriptor-no-unknown"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/at-rule-descriptor-no-unknown/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# at-rule-descriptor-no-unknown

Disallow unknown descriptors for at-rules.

```css
@counter-style foo {
  unknown-descriptor: cyclic;
/**                ↑
 * Descriptors like this */
}
```

Use this rule to avoid mistyped descriptors. Browsers ignore unknown descriptors, so a `@font-face` with `srcc` instead of `src` loads nothing.

This rule considers descriptors defined in the CSS Specifications, up to and including Editor's Drafts, to be known.

You can filter the CSSTree Syntax Reference to find out what descriptors are known for an at-rule, and use the `languageOptions` configuration property to extend it.

> **Warning:**
> This rule is only appropriate for CSS. You should not turn it on for CSS-like languages, such as SCSS or Less.

This rule checks descriptors within at-rules. To check properties, you can use the `property-no-unknown` rule.

This rule supports 2 message arguments: the at-rule and the unknown descriptor.

Prior art:

- stylelint-csstree-validator

## Options

### `true`

```json
{
  "at-rule-descriptor-no-unknown": true
}
```

The following patterns are considered problems:

```css
@counter-style foo {
  unknown-descriptor: cyclic;
}
```

```css
@property --foo {
  unknown-descriptor: "<color>";
}
```

The following patterns are _not_ considered problems:

```css
@counter-style foo {
  system: cyclic;
}
```

```css
@property --foo {
  syntax: "<color>";
}
```
