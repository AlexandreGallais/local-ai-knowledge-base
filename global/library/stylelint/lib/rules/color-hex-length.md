---
title: "color-hex-length"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/color-hex-length/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# color-hex-length

Specify short or long notation for hex colors.

```css
a { color: #fff }
/**        ↑
 * This hex color */
```

The `fix` option can automatically fix all of the problems reported by this rule.

This rule supports 2 message arguments: the hex color and its expected notation.

## Options

### `"short"`

```json
{
  "color-hex-length": "short"
}
```

The following patterns are considered problems:

```css
a { color: #ffffff; }
```

```css
a { color: #ffffffaa; }
```

The following patterns are _not_ considered problems:

```css
a { color: #fff; }
```

```css
a { color: #fffa; }
```

```css
a { color: #a4a4a4; }
```

### `"long"`

```json
{
  "color-hex-length": "long"
}
```

The following patterns are considered problems:

```css
a { color: #fff; }
```

```css
a { color: #fffa; }
```

The following patterns are _not_ considered problems:

```css
a { color: #ffffff; }
```

```css
a { color: #ffffffaa; }
```
