---
title: "color-hex-alpha"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/color-hex-alpha/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# color-hex-alpha

Require or disallow alpha channel for hex colors.

```css
a { color: #fffa }
/**            ↑
 * This alpha channel */
```

Use this rule to enforce a convention. A hex color can carry its alpha as a fourth pair of digits, e.g. `#00000080`. Choose one for consistency.

This rule supports 1 message argument: the hex color.

## Options

### `"always"`

```json
{
  "color-hex-alpha": "always"
}
```

The following patterns are considered problems:

```css
a { color: #fff; }
```

```css
a { color: #ffffff; }
```

The following patterns are _not_ considered problems:

```css
a { color: #fffa; }
```

```css
a { color: #ffffffaa; }
```

### `"never"`

```json
{
  "color-hex-alpha": "never"
}
```

The following patterns are considered problems:

```css
a { color: #fffa; }
```

```css
a { color: #ffffffaa; }
```

The following patterns are _not_ considered problems:

```css
a { color: #fff; }
```

```css
a { color: #ffffff; }
```
