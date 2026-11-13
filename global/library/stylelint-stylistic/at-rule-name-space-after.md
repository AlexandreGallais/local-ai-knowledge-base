---
title: "at-rule-name-space-after"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/at-rule-name-space-after/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# at-rule-name-space-after

Require a single space after at-rule names.

```css
@media (max-width: 600px) {}
/**   ↑
 * The space after at-rule names */
```

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"always-single-line"`

### `"always"`

There _must always_ be a single space after at-rule names.

The following patterns are considered problems:

```css
@charset"UTF-8";
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

The following patterns are _not_ considered problems:

```css
@charset "UTF-8";
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
@charset"UTF-8";
```

```css
@media(min-width: 700px) {}
```

```css
@media  (min-width: 700px) {}
```

The following patterns are _not_ considered problems:

```css
@charset "UTF-8";
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
