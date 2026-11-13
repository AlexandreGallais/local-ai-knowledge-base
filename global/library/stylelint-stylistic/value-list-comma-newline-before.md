---
title: "value-list-comma-newline-before"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/value-list-comma-newline-before/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
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

The following patterns are _not_ considered problems:

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

The following patterns are _not_ considered problems:

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

The following patterns are _not_ considered problems:

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
