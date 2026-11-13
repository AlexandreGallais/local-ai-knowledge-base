---
title: "comment-no-empty"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/comment-no-empty/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# comment-no-empty

Disallow empty comments.

```css
    /* */
/** ↑
 * Comments like this */
```

This rule ignores SCSS-like comments.

> **Warning:**
> Comments within _selector and value lists_ are currently ignored.

This rule doesn't have any message arguments.

## Options

### `true`

```json
{
  "comment-no-empty": true
}
```

The following patterns are considered problems:

```css
/**/
```

```css
/* */
```

```css
/*

 */
```

The following patterns are _not_ considered problems:

```css
/* comment */
```

```css
/*
 * Multi-line Comment
**/
```
