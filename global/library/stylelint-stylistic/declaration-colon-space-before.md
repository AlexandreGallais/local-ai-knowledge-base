---
title: "declaration-colon-space-before"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/declaration-colon-space-before/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# declaration-colon-space-before

Require a single space or disallow whitespace before the colon of declarations.

```css
a { color :pink }
/**       ↑
 * The space before this colon */
```

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"`

### `"always"`

There _must always_ be a single space before the colon.

The following patterns are considered problems:

```css
a { color: pink }
```

```css
a { color:pink }
```

The following patterns are _not_ considered problems:

```css
a { color : pink }
```

```css
a { color :pink }
```

### `"never"`

There _must never_ be whitespace before the colon.

The following patterns are considered problems:

```css
a { color : pink }
```

```css
a { color :pink }
```

The following patterns are _not_ considered problems:

```css
a { color: pink }
```

```css
a { color:pink }
```
