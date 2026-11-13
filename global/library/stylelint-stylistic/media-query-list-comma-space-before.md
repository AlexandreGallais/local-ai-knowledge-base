---
title: "media-query-list-comma-space-before"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/media-query-list-comma-space-before/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# media-query-list-comma-space-before

Require a single space or disallow whitespace before the commas of media query lists.

```css
@media screen and (color) ,projection and (color) {}
/**                       ↑
 * The space before this comma */
```

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"|"always-single-line"|"never-single-line"`

### `"always"`

There _must always_ be a single space before the commas.

The following patterns are considered problems:

```css
@media screen and (color),projection and (color) {}
```

```css
@media screen and (color)
,projection and (color) {}
```

The following patterns are _not_ considered problems:

```css
@media screen and (color) ,projection and (color) {}
```

```css
@media screen and (color) ,
projection and (color) {}
```

### `"never"`

There _must never_ be whitespace before the commas.

The following patterns are considered problems:

```css
@media screen and (color) ,projection and (color) {}
```

```css
@media screen and (color)
, projection and (color) {}
```

The following patterns are _not_ considered problems:

```css
@media screen and (color),projection and (color) {}
```

```css
@media screen and (color),
projection and (color) {}
```

### `"always-single-line"`

There _must always_ be a single space before the commas in single-line media query lists.

The following patterns are considered problems:

```css
@media screen and (color),projection and (color) {}
```

The following patterns are _not_ considered problems:

```css
@media screen and (color) ,projection and (color) {}
```

```css
@media screen and (color)
, projection and (color) {}
```

```css
@media screen and (color)
,projection and (color) {}
```

### `"never-single-line"`

There _must never_ be whitespace before the commas in single-line media query lists.

The following patterns are considered problems:

```css
@media screen and (color) , projection and (color) {}
```

The following patterns are _not_ considered problems:

```css
@media screen and (color),projection and (color) {}
```

```css
@media screen and (color)
,projection and (color) {}
```

```css
@media screen and (color)
, projection and (color) {}
```
