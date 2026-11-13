---
title: "value-list-comma-space-before"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/value-list-comma-space-before/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# value-list-comma-space-before

Require a single space or disallow whitespace before the commas of value lists.

```css
a { background-size: 0 ,0; }
/**                    ↑
 * The space before this comma */
```

The `fix` option can automatically fix most of the problems reported by this rule.

## Options

`string`: `"always"|"never"|"always-single-line"|"never-single-line"`

### `"always"`

There _must always_ be a single space before the commas.

The following patterns are considered problems:

```css
a { background-size: 0,0; }
```

```css
a { background-size: 0
      , 0; }
```

The following patterns are _not_ considered problems:

```css
a { background-size: 0 ,0; }
```

```css
a { background-size: 0 ,
      0; }
```

### `"never"`

There _must never_ be whitespace before the commas.

The following patterns are considered problems:

```css
a { background-size: 0 ,0; }
```

```css
a { background-size: 0 ,
      0; }
```

The following patterns are _not_ considered problems:

```css
a { background-size: 0,0; }
```

```css
a { background-size: 0,
      0; }
```

### `"always-single-line"`

There _must always_ be a single space before the commas in single-line value lists.

The following patterns are considered problems:

```css
a { background-size: 0,0; }
```

The following patterns are _not_ considered problems:

```css
a { background-size: 0 ,0; }
```

```css
a { background-size: 0 ,
      0; }
```

```css
a { background-size: 0
      , 0; }
```

### `"never-single-line"`

There _must never_ be whitespace before the commas in single-line value lists.

The following patterns are considered problems:

```css
a { background-size: 0 ,0; }
```

The following patterns are _not_ considered problems:

```css
a { background-size: 0,0; }
```

```css
a { background-size: 0,
      0; }
```

```css
a { background-size: 0 ,
      0; }
```
