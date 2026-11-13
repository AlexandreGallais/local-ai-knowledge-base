---
title: "block-no-empty"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/block-no-empty/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# block-no-empty

Disallow empty blocks.

```css
 a { }
/** ↑
 * Blocks like this */
```

Use this rule to avoid leftovers from edits, such as empty style rules.

This rule doesn't have any message arguments.

## Options

### `true`

```json
{
  "block-no-empty": true
}
```

The following patterns are considered problems:

```css
a {}
```

```css
a { }
```

```css
@media print {
  a {}
}
```

The following patterns are _not_ considered problems:

```css
a {
  /* foo */
}
```

```css
@media print {
  a {
    color: pink;
  }
}
```

## Optional secondary options

### `ignore`

```json
{ "ignore": ["array", "of", "options"] }
```

#### `"comments"`

Exclude comments from being treated as content inside of a block.

```json
{
  "block-no-empty": [true, { "ignore": ["comments"] }]
}
```

The following patterns are considered problems:

```css
a {
  /* foo */
}
```

```css
@media print {
  a {
    /* foo */
  }
}
```
