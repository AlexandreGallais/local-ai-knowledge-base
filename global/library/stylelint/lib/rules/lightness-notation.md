---
title: "lightness-notation"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/lightness-notation/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# lightness-notation

Specify number or percentage notation for lightness.

```css
    a { color: oklch(85% 0.17 88) }
/**                  ↑
 *                   This notation */
```

This rule supports `oklch`, `oklab`, `lch` and `lab` functions.

The `fix` option can automatically fix all of the problems reported by this rule.

This rule supports 2 message arguments: the lightness value and its expected notation.

## Options

### `"percentage"`

Lightness _must always_ use the percentage notation.

```json
{
  "lightness-notation": "percentage"
}
```

The following patterns are considered problems:

```css
a { color: oklch(0.85 0.17 88) }
```

```css
a { color: oklab(0.86 0.2 154) }
```

```css
a { color: lch(85 0.17 88) }
```

```css
a { color: lab(86 0.2 154) }
```

The following patterns are _not_ considered problems:

```css
a { color: oklch(85% 0.17 88) }
```

```css
a { color: oklab(86% 0.2 154) }
```

```css
a { color: lch(85% 0.17 88) }
```

```css
a { color: lab(86% 0.2 154) }
```

### `"number"`

Lightness _must always_ use the number notation.

```json
{
  "lightness-notation": "number"
}
```

The following patterns are considered problems:

```css
a { color: oklch(85% 0.17 88) }
```

```css
a { color: oklab(86% 0.2 154) }
```

```css
a { color: lch(85% 0.17 88) }
```

```css
a { color: lab(86% 0.2 154) }
```

The following patterns are _not_ considered problems:

```css
a { color: oklch(0.85 0.17 88) }
```

```css
a { color: oklab(0.86 0.2 154) }
```

```css
a { color: lch(85 0.17 88) }
```

```css
a { color: lab(86 0.2 154) }
```
