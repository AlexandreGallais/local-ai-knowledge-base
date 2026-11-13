---
title: "declaration-block-semicolon-newline-before"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/declaration-block-semicolon-newline-before/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# declaration-block-semicolon-newline-before

Require a newline or disallow whitespace before the semicolons of declaration blocks.

```css
  a {
    color: pink
    ; top: 0;
  } ↑
/** ↑
 * The newline before this semicolon */
```

This rule ignores semicolons that are preceded by Less mixins.

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"always-multi-line"|"never-multi-line"`

### `"always"`

There _must always_ be a newline before the semicolons.

The following patterns are considered problems:

```css
a { color: pink; }
```

```css
a {
  color: pink; top: 0;
}
```

The following patterns are _not_ considered problems:

```css
a { color: pink
; }
```

```css
a {
  color: pink
  ; top: 0;
}
```

### `"always-multi-line"`

There _must always_ be a newline before the semicolons in multi-line rules.

The following patterns are considered problems:

```css
a {
  color: pink; top: 0;
}
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }
```

```css
a { color: pink; top: 0; }
```

```css
a {
  color: pink
  ; top: 0;
}
```

### `"never-multi-line"`

There _must never_ be whitespace before the semicolons in multi-line rules.

The following patterns are considered problems:

```css
a {
  color: pink
  ; top: 0;
}
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }
```

```css
a { color: pink; top: 0; }
```

```css
a {
  color: pink;
  top: 0;
}
```
