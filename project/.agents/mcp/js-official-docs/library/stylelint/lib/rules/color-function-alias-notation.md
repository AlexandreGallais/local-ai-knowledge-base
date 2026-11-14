---
title: "color-function-alias-notation"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/color-function-alias-notation/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# color-function-alias-notation

Specify alias notation for color-functions.

```css
    a { color: rgb(0 0 0 / 0.2) }
/**            ↑
 *             This notation */
```

Use this rule to enforce a convention. `rgba()` and `hsla()` are aliases of `rgb()` and `hsl()`, which accept an alpha value themselves.

Choose:

- `"without-alpha"` to follow the specification, which keeps the aliases only for compatibility
- `"with-alpha"` for older browsers, which accept an alpha value only in `rgba()` and `hsla()`

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
