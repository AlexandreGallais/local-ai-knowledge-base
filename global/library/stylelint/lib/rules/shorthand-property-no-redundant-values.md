---
title: "shorthand-property-no-redundant-values"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/shorthand-property-no-redundant-values/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# shorthand-property-no-redundant-values

Disallow redundant values within shorthand properties.

```css
a { margin: 1px 1px 1px 1px; }
/**             ↑   ↑   ↑
 *           These values */
```

Use this rule to enforce a convention. For example, require `margin: 1px` rather than `margin: 1px 1px 1px 1px`, as a shorthand repeats the values you omit.

This rule checks the following shorthand properties:

- `margin`, `margin-block`, `margin-inline`
- `padding`, `padding-block`, `padding-inline`
- `border-color`, `border-style`, `border-width`
- `border-radius`
- `border-block-color`, `border-block-style`, `border-block-width`
- `border-inline-color`, `border-inline-style`, `border-inline-width`
- `gap`, `grid-gap`
- `overflow`,
- `overscroll-behavior`,
- `scroll-margin`, `scroll-margin-block`, `scroll-margin-inline`
- `scroll-padding`, `scroll-padding-block`, `scroll-padding-inline`
- `inset`, `inset-block`, `inset-inline`

The `fix` option can automatically fix all of the problems reported by this rule.

This rule supports 2 message arguments: the redundant value and its condensed form.

## Options

### `true`

```json
{
  "shorthand-property-no-redundant-values": true
}
```

The following patterns are considered problems:

```css
a { margin: 1px 1px; }
```

```css
a { margin: 1px 1px 1px 1px; }
```

```css
a { padding: 1px 2px 1px; }
```

```css
a { border-radius: 1px 2px 1px 2px; }
```

```css
a { -webkit-border-radius: 1px 1px 1px 1px; }
```

The following patterns are _not_ considered problems:

```css
a { margin: 1px; }
```

```css
a { margin: 1px 1px 1px 2px; }
```

```css
a { padding: 1px 1em 1pt 1pc; }
```

```css
a { border-radius: 10px / 5px; }
```

## Optional secondary options

### `ignore`

```json
{ "ignore": ["array", "of", "options"] }
```

#### `"four-into-three-edge-values"`

Ignore four-value shorthand declarations that could be shortened to three values when applied to edges.

The following patterns are _not_ considered problems:

```css
a { margin: 1px 2px 3px 2px; }
```

```css
a { inset: auto 0 0 0; }
```
