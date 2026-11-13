---
title: "relative-selector-nesting-notation"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/relative-selector-nesting-notation/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# relative-selector-nesting-notation

Specify explicit or implicit nesting notation for relative selectors.

```css
a { & > b {} }
/** ↑
 * This notation */
```

Use this rule to enforce a convention. A nested selector that starts with a combinator, e.g. `> b`, is relative to the parent selector whether or not it begins with `&`.

Choose:

- `"explicit"` for clarity
- `"implicit"` for brevity

The `fix` option can automatically fix all of the problems reported by this rule.

This rule supports 1 message argument: the configured notation.

## Options

### `"explicit"`

Relative selectors _must always_ use explicit nesting selector notation.

```json
{
  "relative-selector-nesting-notation": "explicit"
}
```

The following patterns are considered problems:

```css
a {
  b {}
}
```

```css
a {
  > b {}
}
```

The following patterns are _not_ considered problems:

```css
a {
  & b {}
}
```

```css
a {
  & > b {}
}
```

### `"implicit"`

Relative selectors _must always_ use implicit nesting selector notation.

```json
{
  "relative-selector-nesting-notation": "implicit"
}
```

The following patterns are considered problems:

```css
a {
  & b {}
}
```

```css
a {
  & > b {}
}
```

The following patterns are _not_ considered problems:

```css
a {
  b {}
}
```

```css
a {
  > b {}
}
```

```css
a {
  &:hover {}
}
```
