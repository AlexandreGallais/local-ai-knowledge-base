---
title: "lightness-notation"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/lightness-notation/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# lightness-notation

Specify number or percentage notation for lightness.

```css
    a { color: oklch(85% 0.17 88) }
/**                  ↑
 *                   This notation */
```

Use this rule to enforce a convention. Lightness can be a number or a percentage. In `oklch()` and `oklab()` the number runs from `0` to `1`, while in `lch()` and `lab()` it runs from `0` to `100`.

Choose:

- `"percentage"` for consistency across all four functions
- `"number"` to match relative color syntax, where `l` is a number

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
