---
title: "selector-type-no-unknown"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-type-no-unknown/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-type-no-unknown

Disallow unknown type selectors.

```css
    unknown {}
/** ↑
 * This type selector */
```

Use this rule to avoid mistyped type selectors, e.g. `buton`. Browsers accept them as valid, but they match nothing.

This rule considers tags defined in the HTML, SVG, and MathML specifications to be known.

This rule supports 1 message argument: the unknown type selector.

## Options

### `true`

```json
{
  "selector-type-no-unknown": true
}
```

The following patterns are considered problems:

```css
unknown {}
```

```css
tag {}
```

The following patterns are _not_ considered problems:

```css
input {}
```

```css
ul li {}
```

```css
li > a {}
```

## Optional secondary options

### `ignore`

```json
{ "ignore": ["array", "of", "options"] }
```

#### `"custom-elements"`

Allow custom elements.

```json
{
  "selector-type-no-unknown": [true, { "ignore": ["custom-elements"] }]
}
```

The following patterns are considered problems:

```css
unknown {}
```

```css
x-Foo {}
```

The following patterns are _not_ considered problems:

```css
x-foo {}
```

#### `"default-namespace"`

Allow unknown type selectors if they belong to the default namespace.

```json
{
  "selector-type-no-unknown": [true, { "ignore": ["default-namespace"] }]
}
```

The following patterns are considered problems:

```css
namespace|unknown {}
```

The following patterns are _not_ considered problems:

```css
unknown {}
```

### `ignoreNamespaces`

```json
{ "ignoreNamespaces": ["array", "of", "namespaces", "/regex/"] }
```

Given:

```json
{
  "selector-type-no-unknown": [
    true,
    { "ignoreNamespaces": ["/^my-/", "custom-namespace"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
custom-namespace|unknown {}
```

```css
my-namespace|unknown {}
```

```css
my-other-namespace|unknown {}
```

### `ignoreTypes`

```json
{ "ignoreTypes": ["array", "of", "types", "/regex/"] }
```

Given:

```json
{
  "selector-type-no-unknown": [
    true,
    { "ignoreTypes": ["/^my-/", "custom-type"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
custom-type {}
```

```css
my-type {}
```

```css
my-other-type {}
```
