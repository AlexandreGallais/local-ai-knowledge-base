---
title: "no-empty-source"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/no-empty-source/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# no-empty-source

Disallow empty sources.

```css

```

A source containing only whitespace, e.g., spaces, tabs, or newlines, is considered empty.

This rule doesn't have any message arguments.

## Options

### `true`

```json
{
  "no-empty-source": true
}
```

The following patterns are _not_ considered problems:

```css
a {}
```

```css
/* Only comments */
```
