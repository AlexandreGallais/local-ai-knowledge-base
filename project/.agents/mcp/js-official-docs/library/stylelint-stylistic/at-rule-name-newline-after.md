---
title: "at-rule-name-newline-after"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/at-rule-name-newline-after/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# at-rule-name-newline-after

Require a newline after at-rule names.

```css
    @media
   /*↑*/  (max-width: 600px) {}
/**  ↑
 * The newline after this at-rule name */
```

The `fix` option can automatically fix most of the problems reported by this rule. Under Less it writes no break behind an `@import` or `@plugin` with no whitespace behind the name, since Less takes the two as directives only with whitespace there. The warning stands.

The rule passes over `@charset`, whose spelling Stylelint's `at-charset-rule-no-invalid` rule judges; a CSS file holding one gets a warning asking for that rule where the configuration leaves it off.

## Options

`string`: `"always"|"always-multi-line"`

### `"always"`

There _must always_ be a newline after at-rule names.

The following patterns are considered problems:

```css
@import "x.css";
```

```css
@media (min-width: 700px) and
  (orientation: landscape) {}
```

The following patterns are _not_ considered problems:

```css
@import
  "x.css";
```

```css
@import
  "x.css" screen and
 (orientation:landscape);
```

```css
@media
  (min-width: 700px) and (orientation: landscape) {}
```

```css
@media
  (min-width: 700px) and
  (orientation: landscape) {}
```

### `"always-multi-line"`

There _must always_ be a newline after at-rule names in at-rules with multi-line parameters.

The following patterns are considered problems:

```css
@import "x.css" screen and
 (orientation:landscape);
```

```css
@media (min-width: 700px) and
 (orientation: landscape) {}
```

The following patterns are _not_ considered problems:

```css
@import "x.css";
```

```css
@import
  "x.css";
```

```css
@import "x.css" screen and (orientation:landscape);
```

```css
@media (min-width: 700px) and (orientation: landscape) {}
```

```css
@media
  (min-width: 700px) and
  (orientation: landscape) {}
```
