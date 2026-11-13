---
title: "declaration-property-value-no-unknown"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/declaration-property-value-no-unknown/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# declaration-property-value-no-unknown

Disallow unknown values for properties within declarations.

```css
a { top: unknown; }
/** ↑    ↑
 * property and value pairs like these */
```

Use this rule to avoid values unknown to their property, e.g. `width: 10`, which lacks a unit. Browsers ignore the whole declaration.

This rule considers values for properties defined in the CSS Specifications, up to and including Editor's Drafts, to be known.

For custom properties declared or defined within the same source or within the files specified in the `referenceFiles` configuration property, this rule checks the values of:

- declarations that contain `var()`, by substituting each declared value of the custom property, or a value of its `@property` syntax when none match it
- custom properties defined using `@property`

You can filter the CSSTree Syntax Reference to find out what value syntax is known for a property, and use the `languageOptions` configuration property to extend it.

This rule checks property values. You can use `at-rule-descriptor-value-no-unknown` to disallow unknown values for descriptors within at-rules.

This rule reports values unknown to their property. You can use `value-no-invalid` to disallow values that are invalid regardless of their property.

> **Warning:**
> This rule is only appropriate for CSS. You should not turn it on for CSS-like languages, such as SCSS or Less.

> **Note:**
> When using this rule, we recommend turning off these overlapping rules or configuring them to ignore the overlaps:
>
> - `color-no-invalid-hex`
> - `function-linear-gradient-no-nonstandard-direction`
> - `function-no-unknown`
> - `string-no-newline`
> - `unit-no-unknown`

This rule supports up to 4 message arguments: the property name, the unknown value (or the `@property` syntax when a value of it was substituted), the `var()` functions it was substituted for, and the syntax the custom property is registered with.

Prior art:

- stylelint-csstree-validator

## Options

### `true`

```json
{
  "declaration-property-value-no-unknown": true
}
```

The following patterns are considered problems:

```css
a { top: red; }
```

```css
a { top: unknown; }
```

```css
a { --foo: red; top: var(--foo); }
```

```css
@property --foo {
  syntax: "<color>";
}

a { top: var(--foo); }
```

The following patterns are _not_ considered problems:

```css
a { top: 0; }
```

```css
a { top: var(--foo); }
```

```css
a { --foo: 0; top: var(--foo); }
```

## Optional secondary options

### `ignoreProperties`

```json
{
  "ignoreProperties": { "property-name": ["array", "of", "values", "/regex/"] }
}
```

Ignore the specified property and value pairs. Keys in the object indicate property names.

You can specify a regex for a property name, such as `{ "/^margin/": [] }`.

Given:

```json
{
  "declaration-property-value-no-unknown": [
    true,
    {
      "ignoreProperties": {
        "top": ["unknown"],
        "/^margin-/": ["/^--foo/"],
        "padding": ["/.+/"],
        "/.+/": ["--unknown-value"]
      }
    }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a { top: unknown; }
```

```css
a { margin-top: --foo-bar; }
```

```css
a { padding: invalid; }
```

```css
a { width: --unknown-value; }
```
