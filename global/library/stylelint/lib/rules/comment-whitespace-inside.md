---
title: "comment-whitespace-inside"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/comment-whitespace-inside/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# comment-whitespace-inside

Require or disallow whitespace on the inside of comment markers.

```css
    /* comment */
/**  ↑         ↑
 * The space inside these two markers */
```

Any number of asterisks are allowed at the beginning or end of the comment. So `/** comment **/` is treated the same way as `/* comment */`.

> **Warning:**
> Comments within _selector and value lists_ are currently ignored.

The `fix` option can automatically fix all of the problems reported by this rule.

This rule doesn't have any message arguments.

## Options

### `"always"`

There _must always_ be whitespace inside the markers.

```json
{
  "comment-whitespace-inside": "always"
}
```

The following patterns are considered problems:

```css
/*comment*/
```

```css
/*comment */
```

```css
/** comment**/
```

The following patterns are _not_ considered problems:

```css
/* comment */
```

```css
/** comment **/
```

```css
/**
 * comment
 */
```

```css
/*     comment
*/
```

### `"never"`

There _must never_ be whitespace on the inside the markers.

```json
{
  "comment-whitespace-inside": "never"
}
```

The following patterns are considered problems:

```css
/* comment */
```

```css
/*comment */
```

```css
/** comment**/
```

The following patterns are _not_ considered problems:

```css
/*comment*/
```

```css
/****comment****/
```
