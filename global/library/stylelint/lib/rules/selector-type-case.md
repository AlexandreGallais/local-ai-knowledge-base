---
title: "selector-type-case"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-type-case/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-type-case

Specify lowercase or uppercase for type selectors.

```css
    a {}
/** ↑
 * This is type selector */
```

Use this rule to enforce a convention, as type selectors match HTML elements regardless of case. For example, require lowercase, as HTML writes element names. This rule ignores mixed-case SVG elements, e.g. `foreignObject`, whose case is significant.

The `fix` option can automatically fix all of the problems reported by this rule.

This rule supports 2 message arguments: the type selector and its expected case.

## Options

### `"lower"`

```json
{
  "selector-type-case": "lower"
}
```

The following patterns are considered problems:

```css
A {}
```

```css
LI {}
```

The following patterns are _not_ considered problems:

```css
a {}
```

```css
li {}
```

### `"upper"`

```json
{
  "selector-type-case": "upper"
}
```

The following patterns are considered problems:

```css
a {}
```

```css
li {}
```

The following patterns are _not_ considered problems:

```css
A {}
```

```css
LI {}
```

## Optional secondary options

### `ignoreTypes`

```json
{ "ignoreTypes": ["array", "of", "types", "/regex/"] }
```

Given:

```json
{
  "selector-type-case": [
    "lower",
    { "ignoreTypes": ["$childClass", "/(p|P)arent.*/"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
myParentClass {
  color: pink;
}

$childClass {
  color: pink;
}
```
