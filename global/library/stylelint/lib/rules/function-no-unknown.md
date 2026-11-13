---
title: "function-no-unknown"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/function-no-unknown/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# function-no-unknown

Disallow unknown functions.

```css
a { transform: unknown(1); }
/**            ↑
 * Functions like this */
```

This rule considers functions defined in the CSS Specifications to be known.

This rule ignores double-dashed custom functions, e.g. `--custom-function()`.

> **Note:**
> We recommend only using this rule for CSS-like languages, such as SCSS and Less. For CSS, we recommend using these more capable and overlapping rules instead:
>
> - `at-rule-descriptor-value-no-unknown`
> - `declaration-property-value-no-unknown`

This rule supports 1 message argument: the unknown function.

## Options

### `true`

```json
{
  "function-no-unknown": true
}
```

The following patterns are considered problems:

```css
a { transform: unknown(1); }
```

The following patterns are _not_ considered problems:

```css
a { transform: scale(1); }
```

```css
a { transform: --custom-function(1); }
```

## Optional secondary options

### `ignoreFunctions`

```json
{ "ignoreFunctions": ["array", "of", "functions", "/regex/"] }
```

Ignore the specified functions.

Given:

```json
{
  "function-no-unknown": [true, { "ignoreFunctions": ["theme", "/^foo-/"] }]
}
```

The following patterns are _not_ considered problems:

```css
a { transform: theme(1); }
```

```css
a { transform: foo-func(1); }
```
