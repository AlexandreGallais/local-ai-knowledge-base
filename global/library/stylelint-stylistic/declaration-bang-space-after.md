---
title: "declaration-bang-space-after"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/declaration-bang-space-after/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# declaration-bang-space-after

Require a single space or disallow whitespace after the bang of declarations.

```css
a { color: pink !important; }
/**             ↑
 * The space after this exclamation mark */
```

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"`

### `"always"`

There _must always_ be a single space after the bang.

The following patterns are considered problems:

```css
a { color: pink !important; }
```

```css
a { color: pink      !important; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink ! important; }
```

```css
a { color: pink! important; }
```

### `"never"`

There _must never_ be whitespace after the bang.

The following patterns are considered problems:

```css
a { color: pink ! important; }
```

```css
a { color: pink! important; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink !important; }
```

```css
a { color:pink!important; }
```
