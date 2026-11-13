---
title: "selector-list-comma-space-after"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/selector-list-comma-space-after/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# selector-list-comma-space-after

Require a single space or disallow whitespace after the commas of selector lists.

```css
   a, b { color: pink; }
/** ↑
 * The space after this comma */
```

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"|"always-single-line"|"never-single-line"`

### `"always"`

There _must always_ be a single space after the commas.

The following patterns are considered problems:

```css
a,b { color: pink; }
```

```css
a ,b { color: pink; }
```

The following patterns are _not_ considered problems:

```css
a, b { color: pink; }
```

```css
a , b { color: pink; }
```

### `"never"`

There _must never_ be whitespace after the commas.

The following patterns are considered problems:

```css
a, b { color: pink; }
```

```css
a , b { color: pink; }
```

The following patterns are _not_ considered problems:

```css
a,b { color: pink; }
```

```css
a ,b { color: pink; }
```

### `"always-single-line"`

There _must always_ be a single space after the commas in single-line selector lists.

The following patterns are considered problems:

```css
a,b { color: pink; }
```

The following patterns are _not_ considered problems:

```css
a
,b { color: pink; }
```

### `"never-single-line"`

There _must never_ be a single space after the commas in single-line selector lists.

The following patterns are considered problems:

```css
a, b { color: pink; }
```

The following patterns are _not_ considered problems:

```css
a
, b { color: pink; }
```
