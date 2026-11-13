---
title: "declaration-no-important"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/declaration-no-important/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# declaration-no-important

Disallow `!important` within declarations.

```css
a { color: pink !important; }
/**             ↑
 * This !important */
```

If you always want `!important` in your declarations, e.g. if you're writing user styles, you can _safely_ add them using `postcss-safe-important`.

This rule doesn't have any message arguments.

## Options

### `true`

```json
{
  "declaration-no-important": true
}
```

The following patterns are considered problems:

```css
a { color: pink !important; }
```

```css
a { color: pink ! important; }
```

```css
a { color: pink!important; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }
```
