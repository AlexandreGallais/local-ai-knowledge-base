---
title: "block-closing-brace-newline-before"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/block-closing-brace-newline-before/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# block-closing-brace-newline-before

Require a newline or disallow whitespace before the closing brace of blocks.

```css
    a { color: pink;
    }
/** ↑
 * The newline before this brace */
```

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"always-multi-line"|"never-multi-line"`

### `"always"`

There _must always_ be a newline before the closing brace.

The following patterns are considered problems:

```css
a { color: pink;}
```

The following patterns are _not_ considered problems:

```css
a { color: pink;
}
```

```css
a {
color: pink;
}
```

### `"always-multi-line"`

There _must always_ be a newline before the closing brace in multi-line blocks.

The following patterns are considered problems:

```css
a {
color: pink;}
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }
```

```css
a { color: pink;
}
```

### `"never-multi-line"`

There _must never_ be whitespace before the closing brace in multi-line blocks.

The following patterns are considered problems:

```css
a {
color: pink; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }
```

```css
a {
color: pink;}
```
