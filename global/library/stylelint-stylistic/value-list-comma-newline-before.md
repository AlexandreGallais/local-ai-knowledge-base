---
title: "value-list-comma-newline-before"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/value-list-comma-newline-before/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# value-list-comma-newline-before

Require a newline or disallow whitespace before the commas of value lists.

```css
  a { background-size: 0
    , 0; }
/** ↑
 * The newline before this comma */
```

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"always-multi-line"|"never-multi-line"`

### `"always"`

There _must always_ be a newline before the commas.

The following patterns are considered problems:

```css
a { background-size: 0,0; }
```

```css
a { background-size: 0,
      0; }
```

The following patterns are _not_ considered problems:

```css
a { background-size: 0
      , 0; }
```

### `"always-multi-line"`

There _must always_ be a newline before the commas in multi-line value lists.

The following patterns are considered problems:

```css
a { background-size: 0,
      0; }
```

The following patterns are _not_ considered problems:

```css
a { background-size: 0, 0; }
```

```css
a { background-size: 0,0; }
```

```css
a { background-size: 0
      , 0; }
```

### `"never-multi-line"`

There _must never_ be whitespace before the commas in multi-line value lists.

The following patterns are considered problems:

```css
a { background-size: 0
      , 0; }
```

The following patterns are _not_ considered problems:

```css
a { background-size: 0,0; }
```

```css
a { background-size: 0, 0; }
```

```css
a { background-size: 0,
      0; }
```
