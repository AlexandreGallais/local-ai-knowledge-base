---
title: "declaration-block-semicolon-space-before"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/declaration-block-semicolon-space-before/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# declaration-block-semicolon-space-before

Require a single space or disallow whitespace before the semicolons of declaration blocks.

```css
a { color: pink; }
/**            ↑
 * The space before this semicolon */
```

This rule ignores semicolons that are preceded by Less mixins.

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"|"always-single-line"|"never-single-line"`

### `"always"`

There _must always_ be a single space before the semicolons.

The following patterns are considered problems:

```css
a { color: pink; }
```

```css
a { color: pink; top: 0; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink ; }
```

```css
a { color: pink ; top: 0 ; }
```

### `"never"`

There _must never_ be whitespace before the semicolons.

The following patterns are considered problems:

```css
a { color: pink ; }
```

```css
a { color: pink ; top: 0 ; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }
```

```css
a { color: pink; top: 0; }
```

### `"always-single-line"`

There _must always_ be a single space before the semicolons in single-line declaration blocks.

The following patterns are considered problems:

```css
a { color: pink; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink ; }
```

```css
a { color: pink; top: 0; }
```

```css
a { color: pink ; top: 0 ; }
```

### `"never-single-line"`

There _must never_ be whitespace before the semicolons in single-line declaration blocks.

The following patterns are considered problems:

```css
a { color: pink ; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }
```

```css
a { color: pink; top: 0; }
```

```css
a { color: pink ; top: 0 ; }
```
