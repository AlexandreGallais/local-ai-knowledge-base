---
title: "media-query-list-comma-newline-before"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/media-query-list-comma-newline-before/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# media-query-list-comma-newline-before

Require a newline or disallow whitespace before the commas of media query lists.

```css
    @media screen and (color)
    , projection and (color) {}
/** ↑
 * This comma */
```

## Options

`string`: `"always"|"always-multi-line"|"never-multi-line"`

### `"always"`

There _must always_ be a newline before the commas.

The following patterns are considered problems:

```css
@media screen and (color), projection and (color) {}
```

```css
@media screen and (color),
projection and (color) {}
```

The following patterns are _not_ considered problems:

```css
@media screen and (color)
,projection and (color) {}
```

```css
@media screen and (color)
,
projection and (color) {}
```

### `"always-multi-line"`

There _must always_ be a newline before the commas in multi-line media query lists.

The following patterns are considered problems:

```css
@media screen and (color),
projection and (color) {}
```

The following patterns are _not_ considered problems:

```css
@media screen and (color), projection and (color) {}
```

```css
@media screen and (color)
,projection and (color) {}
```

```css
@media screen and (color)
,
projection and (color) {}
```

### `"never-multi-line"`

There _must never_ be whitespace before the commas in multi-line media query lists.

The following patterns are considered problems:

```css
@media screen and (color)
,projection and (color) {}
```

```css
@media screen and (color)
,
projection and (color) {}
```

The following patterns are _not_ considered problems:

```css
@media screen and (color), projection and (color) {}
```

```css
@media screen and (color),
projection and (color) {}
```
