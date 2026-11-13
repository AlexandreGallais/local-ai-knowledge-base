---
title: "color-hex-alpha"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/color-hex-alpha/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# color-hex-alpha

Require or disallow alpha channel for hex colors.

```css
a { color: #fffa }
/**            ↑
 * This alpha channel */
```

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
