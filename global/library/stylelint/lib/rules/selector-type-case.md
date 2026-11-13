---
title: "selector-type-case"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-type-case/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-type-case

Specify lowercase or uppercase for type selectors.

```css
    a {}
/** ↑
 * This is type selector */
```

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
