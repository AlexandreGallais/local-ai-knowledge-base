---
title: "declaration-block-semicolon-space-before"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/declaration-block-semicolon-space-before/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# declaration-block-semicolon-space-before

Require a single space or disallow whitespace before the semicolons of declaration blocks.

```css
a { color: pink; }
/**            ↑
 * The space before this semicolon */
```

This rule also applies to the declarations of an inline `style` attribute in an HTML-like document.

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

The following patterns are _not_ considered problems:

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

The following patterns are _not_ considered problems:

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

The following patterns are _not_ considered problems:

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

The following patterns are _not_ considered problems:

```css
a { color: pink; }
```

```css
a { color: pink; top: 0; }
```

```css
a { color: pink ; top: 0 ; }
```
