---
title: "nesting-selector-no-missing-scoping-root"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/nesting-selector-no-missing-scoping-root/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# nesting-selector-no-missing-scoping-root

Disallow missing scoping root for nesting selectors.

```css
    & {}
/** ↑
 * This nesting selector */
```

Use this rule to avoid styling the root element by mistake. Browsers resolve `&` outside a nested rule to the root element, as there is no parent to refer to.

This rule doesn't have any message arguments.

## Options

### `true`

```json
{
  "nesting-selector-no-missing-scoping-root": true
}
```

The following patterns are considered problems:

```css
& {}
```

```css
@media all {
  & {}
}
```

```css
@scope (&) {}
```

The following patterns are _not_ considered problems:

```css
a {
  & {}
}
```

```css
a {
  @media all {
    & {}
  }
}
```

```css
a {
  @scope (&) {}
}
```

## Optional secondary options

### `ignoreAtRules`

```json
{ "ignoreAtRules": ["array", "of", "at-rules", "/regex/"] }
```

Ignore nesting selectors within specified at-rules.

Given:

```json
{
  "nesting-selector-no-missing-scoping-root": [
    true,
    { "ignoreAtRules": ["--foo", "/^--bar-/"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
@--foo {
  & {}
}
```

```css
@--bar-baz qux {
  & {}
}
```
