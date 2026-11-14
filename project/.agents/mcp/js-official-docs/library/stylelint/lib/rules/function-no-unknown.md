---
title: "function-no-unknown"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/function-no-unknown/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# function-no-unknown

Disallow unknown functions.

```css
a { transform: unknown(1); }
/**            ↑
 * Functions like this */
```

Use this rule to avoid mistyped functions, e.g. `rgbaa()`. Browsers ignore the whole declaration.

This rule considers functions defined in the CSS Specifications, up to and including Editor's Drafts, to be known.

You can filter the CSSTree Syntax Reference to find out what functions are known, and use the `languageOptions` configuration property to extend it.

This rule ignores:

- double-dashed custom functions, e.g., `--custom-function()`
- vendor-prefixed functions, e.g., `-webkit-calc()`

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
