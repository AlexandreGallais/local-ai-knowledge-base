---
title: "comment-no-empty"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/comment-no-empty/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# comment-no-empty

Disallow empty comments.

```css
    /* */
/** ↑
 * Comments like this */
```

Use this rule to avoid leftovers from edits. An empty comment says nothing.

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
