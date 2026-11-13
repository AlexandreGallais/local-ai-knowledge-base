---
title: "no-invalid-position-at-import-rule"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/no-invalid-position-at-import-rule/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
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

Use this rule to avoid stylesheets that never load. An `@import` after other rules, except `@charset` and `@layer`, is ignored.

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
@charset "utf-8";
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
