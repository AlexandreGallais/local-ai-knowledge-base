---
title: "alpha-value-notation"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/alpha-value-notation/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# alpha-value-notation

Specify percentage or number notation for alpha-values.

```css
    a { color: rgb(0 0 0 / 0.5) }
/**                        ↑
 *                         This notation */
```

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
