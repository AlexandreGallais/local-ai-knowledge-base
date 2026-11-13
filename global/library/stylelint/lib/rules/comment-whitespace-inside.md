---
title: "comment-whitespace-inside"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/comment-whitespace-inside/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# comment-whitespace-inside

Require or disallow whitespace on the inside of comment markers.

```css
    /* comment */
/**  ↑         ↑
 * The space inside these two markers */
```

Use this rule to enforce a convention. For example, require a space inside comment markers for readability.

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
