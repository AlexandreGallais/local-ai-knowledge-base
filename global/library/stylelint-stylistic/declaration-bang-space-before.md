---
title: "declaration-bang-space-before"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/declaration-bang-space-before/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# declaration-bang-space-before

Require a single space or disallow whitespace before the bang of declarations.

```css
a { color: pink !important; }
/**             ↑
 * The space before this exclamation mark */
```

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"`

### `"always"`

There _must always_ be a single space before the bang.

The following patterns are considered problems:

```css
a { color: pink!important; }
```

```css
a { color: pink  ! important; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink !important; }
```

```css
a { color:pink ! important; }
```

### `"never"`

There _must never_ be whitespace before the bang.

The following patterns are considered problems:

```css
a { color : pink !important; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink!important; }
```

```css
a { color: pink! important; }
```
