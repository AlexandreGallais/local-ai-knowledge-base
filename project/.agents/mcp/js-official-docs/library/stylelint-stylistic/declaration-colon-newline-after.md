---
title: "declaration-colon-newline-after"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/declaration-colon-newline-after/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# declaration-colon-newline-after

Require a newline or disallow whitespace after the colon of declarations.

```css
a {
  box-shadow:
    0 0 0 1px #5b9dd9,
    0 0 2px 1px rgba(30, 140, 190, 0.8);
}        /* ↑ */
/**         ↑
 * The newline after this colon */
```

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"always-multi-line"`

### `"always"`

There _must always_ be a newline after the colon.

The following patterns are considered problems:

```css
a { color:pink; }
```

```css
a { color: pink; }
```

The following patterns are _not_ considered problems:

```css
a {
  color:
    pink;
}
```

### `"always-multi-line"`

There _must always_ be a newline after the colon _if the declaration's value is multi-line_.

The following patterns are considered problems:

```css
a {
  box-shadow: 0 0 0 1px #5b9dd9,
    0 0 2px 1px rgba(30, 140, 190, 0.8);
}
```

The following patterns are _not_ considered problems:

```css
a {
  box-shadow:
    0 0 0 1px #5b9dd9,
    0 0 2px 1px rgba(30, 140, 190, 0.8);
}
```

```css
a {
  color: pink;
}
```
