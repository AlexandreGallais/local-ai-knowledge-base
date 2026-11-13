---
title: "selector-pseudo-class-disallowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-pseudo-class-disallowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-pseudo-class-disallowed-list

Specify a list of disallowed pseudo-class selectors.

```css
  a:hover {}
/** ↑
 * This pseudo-class selector */
```

Use this rule to enforce a convention. For example, disallow `focus` in favor of `:focus-visible`, so that focus styles show only when needed.

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
  "selector-pseudo-class-disallowed-list": ["hover", "/^nth-/"]
}
```

The following patterns are considered problems:

```css
a:hover {}
```

```css
a:nth-of-type(5) {}
```

```css
a:nth-child(2) {}
```

The following patterns are _not_ considered problems:

```css
a:focus {}
```

```css
a:first-of-type {}
```
