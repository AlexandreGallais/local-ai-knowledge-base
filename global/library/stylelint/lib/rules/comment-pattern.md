---
title: "comment-pattern"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/comment-pattern/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# comment-pattern

Specify a pattern for comments.

```css
/*  comment */
/** ↑
 * The pattern of this */
```

This rule supports 1 message argument: the configured pattern.

## Options

### `string`

Specify a regex string not surrounded with `"/"`.

Given:

```json
{
  "comment-pattern": "foo .+"
}
```

The following patterns are considered problems:

```css
/*not starting with foo*/
a { color: red; }
```

The following patterns are _not_ considered problems:

```css
/*foo at the beginning*/
a { color: red; }
```
