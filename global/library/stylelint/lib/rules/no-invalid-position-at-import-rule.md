---
title: "no-invalid-position-at-import-rule"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/no-invalid-position-at-import-rule/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# no-invalid-position-at-import-rule

Disallow invalid position `@import` rules.

```css
a {}
@import 'foo.css';
/** ↑
  * This @import */
```

Any `@import` rules must precede all other valid at-rules and style rules in a stylesheet (ignoring `@charset` and `@layer`), or else the `@import` rule is invalid.

This rule doesn't have any message arguments.

## Options

### `true`

```json
{
  "no-invalid-position-at-import-rule": true
}
```

The following patterns are considered problems:

```css
a {}
@import 'foo.css';
```

```css
@media print {}
@import 'foo.css';
```

The following patterns are _not_ considered problems:

```css
@import 'foo.css';
a {}
```

```css
/* some comment */
@import 'foo.css';
```

```css
@charset 'utf-8';
@import 'foo.css';
```

```css
@layer default;
@import url(theme.css) layer(theme);
```

## Optional secondary options

### `ignoreAtRules`

```json
{ "ignoreAtRules": ["array", "of", "at-rules", "/regex/"] }
```

Given:

```json
{
  "no-invalid-position-at-import-rule": [
    true,
    { "ignoreAtRules": ["/^--my-/", "--custom"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
@--my-at-rule "bar.css";
@import "foo.css";
```

```css
@--my-other-at-rule {}
@import "foo.css";
```

```css
@--custom "bar.css";
@import "foo.css"
```
