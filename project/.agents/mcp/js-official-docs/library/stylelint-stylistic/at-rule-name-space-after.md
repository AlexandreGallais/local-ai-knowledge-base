---
title: "at-rule-name-space-after"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/at-rule-name-space-after/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# at-rule-name-space-after

Require a single space after at-rule names.

```css
@media (max-width: 600px) {}
/**   ↑
 * The space after at-rule names */
```

The `fix` option can automatically fix most of the problems reported by this rule. Under Less it writes no space behind an `@import` or `@plugin` with no whitespace behind the name, since Less takes the two as directives only with whitespace there. The warning stands.

The rule passes over `@charset`, whose spelling Stylelint's `at-charset-rule-no-invalid` rule judges; a CSS file holding one gets a warning asking for that rule where the configuration leaves it off.

## Options

`string`: `"always"|"always-single-line"`

### `"always"`

There _must always_ be a single space after at-rule names.

The following patterns are considered problems:

```css
@import"x.css";
```

```css
@media(min-width: 700px) {}
```

```css
@media  (min-width: 700px) {}
```

```css
@media
(min-width: 700px) {}
```

The following patterns are _not_ considered problems:

```css
@import "x.css";
```

```css
@import url("x.css");
```

```css
@media (min-width: 700px) {}
```

### `"always-single-line"`

There _must always_ be a single space after at-rule names in single-line declaration blocks.

The following patterns are considered problems:

```css
@import"x.css";
```

```css
@media(min-width: 700px) {}
```

```css
@media  (min-width: 700px) {}
```

The following patterns are _not_ considered problems:

```css
@import "x.css";
```

```css
@import url("x.css");
```

```css
@media (min-width: 700px) {}
```

```css
@media
(min-width: 700px) {}
```

```css
@media(min-width: 700px) and
  (orientation: portrait) {}
```

```css
@media
  (min-width: 700px) and
  (orientation: portrait) {}
```
