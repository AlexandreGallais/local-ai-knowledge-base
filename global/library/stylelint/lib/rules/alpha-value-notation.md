---
title: "alpha-value-notation"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/alpha-value-notation/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# alpha-value-notation

Specify percentage or number notation for alpha-values.

```css
    a { color: rgb(0 0 0 / 0.5) }
/**                        ↑
 *                         This notation */
```

Use this rule to enforce a convention. An alpha-value can be a number from `0` to `1` or a percentage. Choose one for consistency.

The `fix` option can automatically fix all of the problems reported by this rule.

This rule supports 2 message arguments: the alpha value and its expected notation.

## Options

### `"number"`

Alpha-values _must always_ use the number notation.

```json
{
  "alpha-value-notation": "number"
}
```

The following patterns are considered problems:

```css
a { opacity: 50% }
```

```css
a { color: rgb(0 0 0 / 50%) }
```

The following patterns are _not_ considered problems:

```css
a { opacity: 0.5 }
```

```css
a { color: rgb(0 0 0 / 0.5) }
```

### `"percentage"`

Alpha-values _must always_ use percentage notation.

```json
{
  "alpha-value-notation": "percentage"
}
```

The following patterns are considered problems:

```css
a { opacity: 0.5 }
```

```css
a { color: rgb(0 0 0 / 0.5) }
```

The following patterns are _not_ considered problems:

```css
a { opacity: 50% }
```

```css
a { color: rgb(0 0 0 / 50%) }
```

## Optional secondary options

### `exceptProperties`

```json
{ "exceptProperties": ["array", "of", "properties", "/regex/"] }
```

Reverse the primary option for matching properties.

Given:

```json
{
  "alpha-value-notation": ["percentage", { "exceptProperties": ["opacity"] }]
}
```

The following patterns are considered problems:

```css
a { opacity: 50% }
```

```css
a { color: rgb(0 0 0 / 0.5) }
```

The following patterns are _not_ considered problems:

```css
a { opacity: 0.5 }
```

```css
a { color: rgb(0 0 0 / 50%) }
```
