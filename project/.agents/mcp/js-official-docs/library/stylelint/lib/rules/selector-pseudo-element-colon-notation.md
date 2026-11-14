---
title: "selector-pseudo-element-colon-notation"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-pseudo-element-colon-notation/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-pseudo-element-colon-notation

Specify single or double colon notation for applicable pseudo-element selectors.

```css
    a::before {}
/**  ↑
 * This notation */
```

Use this rule to enforce a convention. Pseudo-elements use two colons to tell them apart from pseudo-classes, but browsers also accept one colon for the four from CSS 2: `:before`, `:after`, `:first-line` and `:first-letter`.

Choose:

- `"double"` for clarity
- `"single"` for older browsers, which don't recognize `::`

The `fix` option can automatically fix all of the problems reported by this rule.

This rule supports 1 message argument: the configured notation.

## Options

### `"single"`

Applicable pseudo-elements _must always_ use the single colon notation.

```json
{
  "selector-pseudo-element-colon-notation": "single"
}
```

The following patterns are considered problems:

```css
a::before { color: pink; }
```

```css
a::after { color: pink; }
```

```css
a::first-letter { color: pink; }
```

```css
a::first-line { color: pink; }
```

The following patterns are _not_ considered problems:

```css
a:before { color: pink; }
```

```css
a:after { color: pink; }
```

```css
a:first-letter { color: pink; }
```

```css
a:first-line { color: pink; }
```

```css
input::placeholder { color: pink; }
```

```css
li::marker { font-variant-numeric: tabular-nums; }
```

### `"double"`

Applicable pseudo-elements _must always_ use the double colon notation.

```json
{
  "selector-pseudo-element-colon-notation": "double"
}
```

The following patterns are considered problems:

```css
a:before { color: pink; }
```

```css
a:after { color: pink; }
```

```css
a:first-letter { color: pink; }
```

```css
a:first-line { color: pink; }
```

The following patterns are _not_ considered problems:

```css
a::before { color: pink; }
```

```css
a::after { color: pink; }
```

```css
a::first-letter { color: pink; }
```

```css
a::first-line { color: pink; }
```

```css
input::placeholder { color: pink; }
```

```css
li::marker { font-variant-numeric: tabular-nums; }
```
