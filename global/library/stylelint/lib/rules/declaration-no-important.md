---
title: "declaration-no-important"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/declaration-no-important/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# declaration-no-important

Disallow `!important` within declarations.

```css
a { color: pink !important; }
/**             ↑
 * This !important */
```

Use this rule to enforce a convention, as `!important` can make styles harder to override. With cascade layers, `!important` in an earlier layer wins over later layers, which can be the intent.

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
