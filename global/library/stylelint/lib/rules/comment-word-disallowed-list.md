---
title: "comment-word-disallowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/comment-word-disallowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# comment-word-disallowed-list

Specify a list of disallowed words within comments.

```css
 /* words within comments */
/** ↑     ↑      ↑
 * These three words */
```

Use this rule to enforce a convention. For example, disallow:

- `/^TODO:/` and `/^FIXME:/` to avoid merging unfinished work
- `/^!/`, which minifiers keep in production bundles

> **Warning:**
> Comments within _selector and value lists_ are currently ignored.

This rule supports 1 message argument: the disallowed word.

## Options

### `Array<string>`

```json
["array", "of", "words", "/regex/"]
```

Given:

```json
{
  "comment-word-disallowed-list": ["/^TODO:/", "badword"]
}
```

The following patterns are considered problems:

```css
/* TODO: */
```

```css
/* TODO: add fallback */
```

```css
/* some badword */
```

The following patterns are _not_ considered problems:

```css
/* comment */
```
