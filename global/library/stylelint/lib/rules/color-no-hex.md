---
title: "color-no-hex"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/color-no-hex/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# color-no-hex

Disallow hex colors.

```css
a { color: #333 }
/**        ↑
 * This hex color */
```

This rule supports 1 message argument: the disallowed hex color.

## Options

### `true`

```json
{
  "color-no-hex": true
}
```

The following patterns are considered problems:

```css
a { color: #000; }
```

```css
a { color: #fff1aa; }
```

```css
a { color: #123456aa; }
```

Hex values that are not valid also cause problems:

```css
a { color: #foobar; }
```

```css
a { color: #0000000000000000; }
```

The following patterns are _not_ considered problems:

```css
a { color: black; }
```

```css
a { color: rgb(0, 0, 0); }
```

```css
a { color: rgba(0, 0, 0, 1); }
```

## Optional secondary options

### `ignoreFunctions`

```json
{ "ignoreFunctions": ["array", "of", "functions", "/regex/"] }
```

Ignore hex colors within the specified functions.

Given:

```json
{
  "color-no-hex": [true, { "ignoreFunctions": ["var", "/^--/"] }]
}
```

The following patterns are _not_ considered problems:

```css
a { color: var(--foo, #fff); }
```

```css
a { color: --foo(#fff); }
```
