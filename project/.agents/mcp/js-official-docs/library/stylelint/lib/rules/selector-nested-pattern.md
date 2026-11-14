---
title: "selector-nested-pattern"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-nested-pattern/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-nested-pattern

Specify a pattern for the selectors of rules nested within rules.

```css
    a {
      color: orange;
      &:hover { color: pink; } }
/**   ↑
 * This nested selector */
```

Use this rule to enforce a convention. For example, require `^&:`, so that only states are nested and descendants get their own rules.

Non-standard selectors (e.g. selectors with Sass or Less interpolation) and selectors of rules nested within at-rules are ignored.

This rule supports 2 message arguments: the selector and the configured pattern.

## Options

### `string`

Specify a regex string not surrounded with `"/"`.

The selector value will be checked in its entirety. If you'd like to allow for combinators and commas, you must incorporate them into your pattern.

Given:

```json
{
  "selector-nested-pattern": "^&:(?:hover|focus)$"
}
```

The following patterns are considered problems:

```css
a {
  .bar {}
}
```

```css
a {
  .bar:hover {}
}
```

```css
a {
  &:hover,
  &:focus {}
}
```

The following patterns are _not_ considered problems:

```css
a {
  &:hover {}
}
```

```css
a {
  &:focus {}
}
```

```css
a {
  &:hover {}
  &:focus {}
}
```

## Optional secondary options

### `splitList`

Split selector lists into individual selectors. Defaults to `false`.

Given:

```json
{
  "selector-nested-pattern": ["^&:(?:hover|focus)$", { "splitList": true }]
}
```

The following patterns are considered problems:

```css
a {
  .bar:hover,
  &:focus {}
}
```

The following patterns are _not_ considered problems:

```css
a {
  &:hover,
  &:focus {}
}
```
