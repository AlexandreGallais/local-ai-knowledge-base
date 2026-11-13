---
title: "block-no-redundant-nested-style-rules"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/block-no-redundant-nested-style-rules/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# block-no-redundant-nested-style-rules

Disallow redundant nested style rules within blocks.

```css
a { & { color: red; } }
/** ↑
 * This nested style rule */
```

This rule doesn't have any message arguments.

## Options

### `true`

```json
{
  "block-no-redundant-nested-style-rules": true
}
```

The following patterns are considered problems:

```css
a { & { color: red; } }
```

```css
a { @media all { & { color: red; } } }
```

The following patterns are _not_ considered problems:

```css
a { color: red; }
```

```css
a { @media all { color: red; } }
```

```css
a { &.foo { color: red; } }
```
