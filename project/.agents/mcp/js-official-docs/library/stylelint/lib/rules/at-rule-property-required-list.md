---
title: "at-rule-property-required-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/at-rule-property-required-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# at-rule-property-required-list

Specify a list of required properties (or descriptors) for an at-rule.

```css
    @font-face { font-display: swap; font-family: 'foo'; }
/**  ↑           ↑                   ↑
 *  At-rule and required descriptor names */
```

Use this rule to enforce a convention. For example, require `font-display` in every `@font-face`, so that text shows while fonts load.

This rule supports 2 message arguments: the at-rule and the required property.

## Options

### `Array<string>`

```json
{ "at-rule-name": ["array", "of", "properties", "or", "descriptors"] }
```

Given:

```json
{
  "at-rule-property-required-list": {
    "font-face": ["font-display", "font-family", "font-style"]
  }
}
```

The following patterns are considered problems:

```css
@font-face {
    font-family: 'foo';
    src: url('./fonts/foo.woff2') format('woff2');
}
```

```css
@font-face {
    font-family: 'foo';
    font-style: normal;
    src: url('./fonts/foo.woff2') format('woff2');
}
```

The following patterns are _not_ considered problems:

```css
@font-face {
    font-display: swap;
    font-family: 'foo';
    font-style: normal;
    src: url('./fonts/foo.woff2') format('woff2');
}
```
