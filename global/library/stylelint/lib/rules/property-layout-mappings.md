---
title: "property-layout-mappings"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/property-layout-mappings/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# property-layout-mappings

Specify flow-relative or physical layout mappings for properties.

```css
a { margin-left: 0; }
/** ↑
 * This property */
```

Physical layout properties like `margin-left` are tied to the physical dimensions of the screen. Flow-relative properties like `margin-inline-start` adapt to different writing modes and text directions, making them useful for internationalization. They are also consistent with other layout concepts like flexbox and grid, which already use flow-relative logic.

The `fix` option can automatically fix problems reported by this rule when both the primary option is `"flow-relative"` and the `languageOptions.directionality` configuration property is configured.

This rule supports 2 message arguments: the disallowed mapping and the property, or the physical property and its flow-relative equivalent.

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
