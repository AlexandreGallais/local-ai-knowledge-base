---
title: "property-layout-mappings"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/property-layout-mappings/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# property-layout-mappings

Specify flow-relative or physical layout mappings for properties.

```css
a { margin-left: 0; }
/** ↑
 * This property */
```

Use this rule to enforce a convention. Physical properties like `margin-left` are tied to the screen, while flow-relative properties like `margin-inline-start` follow the writing mode.

Choose:

- `"flow-relative"` to support right-to-left and vertical writing modes
- `"physical"` if you support only one writing mode, or for older browsers

The `fix` option can automatically fix problems reported by this rule when both the primary option is `"flow-relative"` and the `languageOptions.directionality` configuration property is configured.

This rule supports up to 3 message arguments: the disallowed mapping and the property, or the physical property and its flow-relative equivalents.

Prior art:

- stylelint-plugin-logical-css
- stylelint-use-logical
- stylelint-use-logical-spec

## Options

### `"flow-relative"`

Layout mappings for properties _must always_ be flow-relative.

> **Note:**
> If you want this rule to automatically fix problems, you must configure the `languageOptions.directionality` configuration property.
>
> For example, for Latin-based languages such as English:
>
> ```json
> {
>   "languageOptions": {
>     "directionality": {
>       "block": "top-to-bottom",
>       "inline": "left-to-right"
>     }
>   }
> }
> ```

Given:

```json
{
  "property-layout-mappings": "flow-relative"
}
```

The following patterns are considered problems:

```css
a { margin-left: 0; }
```

```css
a { width: 0; }
```

```css
a { margin: 0 1px; }
```

```css
a { transition: margin-left 0 ease; }
```

The following patterns are _not_ considered problems:

```css
a { margin-inline-start: 0; }
```

```css
a { inline-size: 0; }
```

```css
a { margin: 0; }
```

```css
a { transition: margin-inline-start 0 ease; }
```

### `"physical"`

Layout mappings for properties _must always_ be physical.

Given:

```json
{
  "property-layout-mappings": "physical"
}
```

The following patterns are considered problems:

```css
a { margin-inline-start: 0; }
```

```css
a { inline-size: 0; }
```

```css
a { transition: margin-inline-start 0 ease; }
```

The following patterns are _not_ considered problems:

```css
a { margin-left: 0; }
```

```css
a { width: 0; }
```

```css
a { transition: margin-left 0 ease; }
```

## Optional secondary options

### `ignoreProperties`

Ignore the specified properties.

```json
{ "ignoreProperties": ["array", "of", "properties", "/regex/"] }
```

Given:

```json
{
  "property-layout-mappings": [
    "flow-relative",
    { "ignoreProperties": ["/^margin/", "width"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a { margin-left: 0; }
```

```css
a { width: 0; }
```

```css
a { transition: margin-left 0 ease; }
```
