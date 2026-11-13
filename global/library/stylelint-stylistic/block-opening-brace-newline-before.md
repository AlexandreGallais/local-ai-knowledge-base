---
title: "block-opening-brace-newline-before"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/block-opening-brace-newline-before/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# block-opening-brace-newline-before

Require a newline or disallow whitespace before the opening brace of blocks.

```css
  a
    { color: pink; }
/** ↑
 * The newline before this brace */
```

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"always-single-line"|"never-single-line"|"always-multi-line"|"never-multi-line"`

### `"always"`

There _must always_ be a newline before the opening brace.

The following patterns are considered problems:

```css
a{ color: pink; }
```

```css
a{ color: pink;
}
```

The following patterns are _not_ considered problems:

```css
a
{ color: pink; }
```

```css
a
{
color: pink; }
```

```css
a /* foo */
  {
    color: pink;
  }
```

### `"always-single-line"`

There _must always_ be a newline before the opening brace in single-line blocks.

The following patterns are considered problems:

```css
a{ color: pink; }
```

The following patterns are _not_ considered problems:

```css
a
{ color: pink; }
```

```css
a{
color: pink; }
```

### `"never-single-line"`

There _must never_ be whitespace before the opening brace in single-line blocks.

The following patterns are considered problems:

```css
a { color: pink; }
```

The following patterns are _not_ considered problems:

```css
a{ color: pink; }
```

```css
a {
color: pink; }
```

### `"always-multi-line"`

There _must always_ be a newline before the opening brace in multi-line blocks.

The following patterns are considered problems:

```css
a{
color: pink; }
```

```css
a {
color: pink; }
```

The following patterns are _not_ considered problems:

```css
a{ color: pink; }
```

```css
a { color: pink; }
```

```css
a
{ color: pink; }
```

```css
a
{
color: pink; }
```

### `"never-multi-line"`

There _must never_ be whitespace before the opening brace in multi-line blocks.

The following patterns are considered problems:

```css
a {
color: pink; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }
```

```css
a{
color: pink;}
```
