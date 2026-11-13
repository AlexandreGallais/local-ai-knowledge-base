---
title: "comment-pattern"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/comment-pattern/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# comment-pattern

Specify a pattern for comments.

```css
/*  comment */
/** ↑
 * The pattern of this */
```

Use this rule to enforce a convention. For example, require `^[A-Z]`, so that comments read as sentences.

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
