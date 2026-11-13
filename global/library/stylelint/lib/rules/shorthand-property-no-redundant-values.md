---
title: "shorthand-property-no-redundant-values"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/shorthand-property-no-redundant-values/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# shorthand-property-no-redundant-values

Disallow redundant values within shorthand properties.

```css
a { margin: 1px 1px 1px 1px; }
/**             ↑   ↑   ↑
 *           These values */
```

You can use shorthand properties to set multiple values at once. For example, you can use the `margin` property to set the `margin-top`, `margin-right`, `margin-bottom`, and `margin-left` properties at once.

For some shorthand properties, e.g. those related to the edges of a box, you can safely omit some values.

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
