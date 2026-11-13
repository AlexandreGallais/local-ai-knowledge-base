---
title: "function-parentheses-space-inside"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/function-parentheses-space-inside/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# function-parentheses-space-inside

Require a single space or disallow whitespace on the inside of the parentheses of functions.

```css
a { transform: translate( 1, 1 ); }
/**                     ↑      ↑
 * The space inside these two parentheses */
```

The `fix` option can automatically fix the problems reported by this rule, except where the whitespace holds the line break closing an inline comment: writing over it would move code into the comment, so the whitespace is left alone and the warning stands.

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

The following patterns are _not_ considered problems:

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

The following patterns are _not_ considered problems:

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

The following patterns are _not_ considered problems:

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

The following patterns are _not_ considered problems:

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
