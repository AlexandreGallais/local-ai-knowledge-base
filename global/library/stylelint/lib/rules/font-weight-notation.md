---
title: "font-weight-notation"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/font-weight-notation/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# font-weight-notation

Require numeric or named (where possible) `font-weight` values.

```css
a { font-weight: bold; }
/**              ↑
 *               This notation */

a { font: italic small-caps 600 16px/3 cursive; }
/**                         ↑
 *                          And this notation, too */

@font-face { font-weight: normal bold; }
/**                       ↑
 *                        Multiple notations are available in @font-face */
```

Use this rule to enforce a convention. `normal` and `bold` are names for `400` and `700`.

Choose:

- `"numeric"` for one scale across every weight, including the fine steps of variable fonts
- `"named-where-possible"` for clarity

This rule ignores `$sass`, `@less`, and `var(--custom-property)` variable syntaxes.

The `fix` option can automatically fix all of the problems reported by this rule.

This rule supports up to 2 message arguments: the notation type, or the actual and expected font-weight values.

## Options

### `"numeric"`

`font-weight` values _must always_ be numbers.

```json
{
  "font-weight-notation": "numeric"
}
```

The following patterns are considered problems:

```css
a { font-weight: bold; }
```

```css
a { font: italic normal 20px sans-serif; }
```

```css
@font-face { font-weight: normal bold; }
```

The following patterns are _not_ considered problems:

```css
a { font-weight: 700; }
```

```css
a { font: italic 400 20px; }
```

```css
@font-face { font-weight: 400 700; }
```

### `"named-where-possible"`

`font-weight` values _must always_ be keywords when an appropriate keyword is available.

```json
{
  "font-weight-notation": "named-where-possible"
}
```

This means that only `400` and `700` will be rejected, because those are the only numbers with keyword equivalents (`normal` and `bold`).

The following patterns are considered problems:

```css
a { font-weight: 700; }
```

```css
a { font: italic 400 20px sans-serif; }
```

The following patterns are _not_ considered problems:

```css
a { font-weight: bold; }
```

```css
a { font: italic normal 20px sans-serif; }
```

## Optional secondary options

### `ignore`

```json
{ "ignore": ["array", "of", "options"] }
```

#### `"relative"`

Ignore the _relative_ keyword names of `bolder` and `lighter`.

Given:

```json
{
  "font-weight-notation": ["numeric", { "ignore": ["relative"] }]
}
```

The following patterns are _not_ considered problems:

```css
a { font-weight: 400; }
a b { font-weight: lighter; }
```
