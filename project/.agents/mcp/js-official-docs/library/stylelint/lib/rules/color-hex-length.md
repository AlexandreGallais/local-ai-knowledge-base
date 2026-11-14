---
title: "color-hex-length"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/color-hex-length/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# color-hex-length

Specify short or long notation for hex colors.

```css
a { color: #fff }
/**        ↑
 * This hex color */
```

Use this rule to enforce a convention. A hex color can be shortened when each pair of digits repeats, e.g. `#fff` for `#ffffff`.

Choose:

- `"short"` for brevity
- `"long"` to match colors copied from design tools

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
