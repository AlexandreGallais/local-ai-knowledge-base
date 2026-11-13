---
title: "nesting-selector-no-missing-scoping-root"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/nesting-selector-no-missing-scoping-root/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# nesting-selector-no-missing-scoping-root

Disallow missing scoping root for nesting selectors.

```css
    & {}
/** ↑
 * This nesting selector */
```

CSS nesting selectors (`&`) represent the parent selector in nested CSS. When used at the top level or within certain at-rules without a scoping root, they can cause unexpected behavior or indicate a mistake in the CSS structure.

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
