---
title: "color-function-alias-notation"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/color-function-alias-notation/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# color-function-alias-notation

Specify alias notation for color-functions.

```css
    a { color: rgb(0 0 0 / 0.2) }
/**            ↑
 *             This notation */
```

Color functions `rgb()` and `hsl()` have aliases `rgba()` and `hsla()`. Those are exactly equivalent, and it's preferable to use the first variant without `a`.

The `fix` option can automatically fix all of the problems reported by this rule.

This rule supports 2 message arguments: the color value and its expected notation.

## Options

### `"without-alpha"`

Applicable color-functions _must always_ use the without alpha notation.

```json
{
  "color-function-alias-notation": "without-alpha"
}
```

The following patterns are considered problems:

```css
a { color: rgba(0 0 0) }
```

```css
a { color: hsla(270 60% 50% / 15%) }
```

The following patterns are _not_ considered problems:

```css
a { color: rgb(0 0 0) }
```

```css
a { color: hsl(270 60% 50% / 15%) }
```

### `"with-alpha"`

Applicable color-functions _must always_ use with alpha notation.

```json
{
  "color-function-alias-notation": "with-alpha"
}
```

The following patterns are considered problems:

```css
a { color: rgb(0 0 0) }
```

```css
a { color: hsl(270 60% 50% / 15%) }
```

The following patterns are _not_ considered problems:

```css
a { color: rgba(0 0 0) }
```

```css
a { color: hsla(270 60% 50% / 15%) }
```
