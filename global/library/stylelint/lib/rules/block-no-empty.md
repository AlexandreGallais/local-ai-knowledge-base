---
title: "block-no-empty"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/block-no-empty/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# block-no-empty

Disallow empty blocks.

```css
 a { }
/** ↑
 * Blocks like this */
```

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
