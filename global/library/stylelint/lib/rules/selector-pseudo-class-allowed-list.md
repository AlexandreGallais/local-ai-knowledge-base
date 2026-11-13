---
title: "selector-pseudo-class-allowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-pseudo-class-allowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-pseudo-class-allowed-list

Specify a list of allowed pseudo-class selectors.

```css
  a:hover {}
/** ↑
 * This pseudo-class selector */
```

Use this rule to enforce a subset of pseudo-classes as a convention. For example, allow only `hover`, `focus-visible` and `not`.

This rule ignores selectors that use variable interpolation e.g. `:#{$variable} {}`.

This rule supports 1 message argument: the disallowed pseudo-class.

## Options

### `Array<string>`

```json
["array", "of", "pseudo-classes", "/regex/"]
```

Given:

```json
{
  "selector-pseudo-class-allowed-list": ["hover", "/^nth-/"]
}
```

The following patterns are considered problems:

```css
a:focus {}
```

```css
a:first-of-type {}
```

The following patterns are _not_ considered problems:

```css
a:hover {}
```

```css
a:nth-of-type(5) {}
```

```css
a:nth-child(2) {}
```
