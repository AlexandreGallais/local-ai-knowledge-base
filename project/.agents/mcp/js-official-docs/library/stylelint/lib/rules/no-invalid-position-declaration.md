---
title: "no-invalid-position-declaration"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/no-invalid-position-declaration/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# no-invalid-position-declaration

Disallow invalid position declarations.

```css
color: red;
/** ↑
 * This declaration */
```

Use this rule to avoid rules that browsers ignore. A declaration outside a block becomes the prelude of the next rule and invalidates it.

Declarations can only be positioned within the `<declaration-list>`, `<declaration-rule-list>` and `<block-contents>` productions.

This rule doesn't have any message arguments.

## Options

### `true`

```json
{
  "no-invalid-position-declaration": true
}
```

The following patterns are considered problems:

```css
color: red;
```

```css
--foo: red;
```

```css
@media all {
  color: red;
}
```

The following patterns are _not_ considered problems:

```css
a { color: red; }
```

```css
a { --foo: red; }
```

```css
@media all {
  a {
    color: red;
  }
}
```

```css
a {
  @media all {
    color: red;
  }
}
```

## Optional secondary options

### `ignoreAtRules`

```json
{ "ignoreAtRules": ["array", "of", "at-rules", "/regex/"] }
```

Ignore nesting at-rules within specified at-rules.

Given:

```json
{
  "no-invalid-position-declaration": [
    true,
    { "ignoreAtRules": ["--foo", "/^--bar-/"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
@--foo {
  @media all {
    color: red;
  }
}
```

```css
@--bar-baz qux {
  @layer foo {
    color: red;
  }
}
```
