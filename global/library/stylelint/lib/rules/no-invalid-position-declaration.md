---
title: "no-invalid-position-declaration"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/no-invalid-position-declaration/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# no-invalid-position-declaration

Disallow invalid position declarations.

```css
color: red;
/** ↑
 * This declaration */
```

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
