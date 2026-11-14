---
title: "selector-pseudo-element-disallowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-pseudo-element-disallowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-pseudo-element-disallowed-list

Specify a list of disallowed pseudo-element selectors.

```css
  a::before {}
/**  ↑
 * This pseudo-element selector */
```

Use this rule to enforce a convention. For example, disallow `/^-webkit-scrollbar/` in favor of `scrollbar-color` and `scrollbar-width`, to follow the specification.

This rule ignores:

- CSS2 pseudo-elements i.e. those prefixed with a single colon
- selectors that use variable interpolation e.g. `::#{$variable} {}`

This rule supports 1 message argument: the disallowed pseudo-element.

## Options

### `Array<string>`

```json
["array", "of", "pseudo-elements", "/regex/"]
```

Given:

```json
{
  "selector-pseudo-element-disallowed-list": ["before", "/^--my-/i"]
}
```

The following patterns are considered problems:

```css
a::before {}
```

```css
a::--my-pseudo-element {}
```

```css
a::--MY-OTHER-pseudo-element {}
```

The following patterns are _not_ considered problems:

```css
a::after {}
```

```css
a::--not-my-pseudo-element {}
```
