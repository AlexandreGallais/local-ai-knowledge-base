---
title: "at-rule-descriptor-no-unknown"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/at-rule-descriptor-no-unknown/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
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
