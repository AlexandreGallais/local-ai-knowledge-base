---
title: "declaration-block-semicolon-newline-before"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/declaration-block-semicolon-newline-before/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
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

This rule also applies to the declarations of an inline `style` attribute in an HTML-like document.

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

The following patterns are _not_ considered problems:

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

The following patterns are _not_ considered problems:

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

The following patterns are _not_ considered problems:

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
