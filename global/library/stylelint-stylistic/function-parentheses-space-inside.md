---
title: "function-parentheses-space-inside"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/function-parentheses-space-inside/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# function-parentheses-space-inside

Require a single space or disallow whitespace on the inside of the parentheses of functions.

```css
a { transform: translate( 1, 1 ); }
/**                     ↑      ↑
 * The space inside these two parentheses */
```

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"|"always-single-line"|"never-single-line"`

### `"always"`

There _must always_ be a single space inside of the parentheses.

The following patterns are considered problems:

```css
a { transform: translate(1, 1); }
```

```css
a { transform: translate(1, 1 ); }
```

The following patterns are _not_ considered problems:

```css
a { transform: translate( 1, 1 ); }
```

### `"never"`

There _must never_ be whitespace on the inside of the parentheses.

The following patterns are considered problems:

```css
a { transform: translate( 1, 1 ); }
```

```css
a { transform: translate(1, 1 ); }
```

The following patterns are _not_ considered problems:

```css
a { transform: translate(1, 1); }
```

### `"always-single-line"`

There _must always_ be a single space inside the parentheses of single-line functions.

The following patterns are considered problems:

```css
a { transform: translate(1, 1) }
```

```css
a { transform: translate(1, 1 ) }
```

The following patterns are _not_ considered problems:

```css
a { transform: translate( 1, 1 ) }
```

```css
a { transform: translate(1,
  1) }
```

```css
a {
  transform: translate(
    1,
    1
  )
}
```

### `"never-single-line"`

There _must never_ be whitespace inside the parentheses of single-line functions.

The following patterns are considered problems:

```css
a { transform: translate( 1, 1 ) }
```

```css
a { transform: translate(1, 1 ) }
```

The following patterns are _not_ considered problems:

```css
a { transform: translate(1, 1) }
```

```css
a { transform: translate( 1,
  1) }
```

```css
a {
  transform: translate(
    1,
    1
  )
}
```
