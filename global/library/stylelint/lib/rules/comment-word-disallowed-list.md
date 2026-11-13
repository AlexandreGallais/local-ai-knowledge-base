---
title: "comment-word-disallowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/comment-word-disallowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# comment-word-disallowed-list

Specify a list of disallowed words within comments.

```css
 /* words within comments */
/** ↑     ↑      ↑
 * These three words */
```

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
