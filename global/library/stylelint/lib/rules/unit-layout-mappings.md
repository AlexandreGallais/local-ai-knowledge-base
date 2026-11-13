---
title: "unit-layout-mappings"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/unit-layout-mappings/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# unit-layout-mappings

Specify flow-relative or physical layout mappings for units.

```css
a { width: 100vw; }
/**           ↑
 *            This unit */
```

Physical units like `vw` and `vh` are tied to the physical dimensions of the viewport. Flow-relative units like `vi` and `vb` adapt to different writing modes and text directions, making them useful for internationalization. They are the unit-level counterpart to flow-relative properties like `inline-size` and `block-size`.

The `fix` option can automatically fix problems reported by this rule when both the primary option is `"flow-relative"` and the `languageOptions.directionality` configuration property is configured.

This rule supports 2 message arguments: the disallowed mapping and the unit, or the physical unit and its flow-relative equivalent.

Prior art:

- stylelint-plugin-logical-css
- stylelint-use-logical
- stylelint-use-logical-spec

## Options

### `"flow-relative"`

Layout mappings for units _must always_ be flow-relative.

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
  "unit-layout-mappings": "flow-relative"
}
```

The following patterns are considered problems:

```css
a { margin-inline-start: 10vw; }
```

```css
a { inline-size: 50cqw; }
```

The following patterns are _not_ considered problems:

```css
a { margin-inline-start: 10vi; }
```

```css
a { inline-size: 50cqi; }
```

### `"physical"`

Layout mappings for units _must always_ be physical.

Given:

```json
{
  "unit-layout-mappings": "physical"
}
```

The following patterns are considered problems:

```css
a { margin-top: 10vb; }
```

```css
a { width: 50cqi; }
```

The following patterns are _not_ considered problems:

```css
a { margin-top: 10vh; }
```

```css
a { width: 50cqw; }
```

## Optional secondary options

### `ignoreUnits`

Ignore the specified units.

```json
{ "ignoreUnits": ["array", "of", "units", "/regex/"] }
```

Given:

```json
{
  "unit-layout-mappings": ["flow-relative", { "ignoreUnits": ["vh", "/^cq/"] }]
}
```

The following patterns are _not_ considered problems:

```css
a { margin-inline-start: 10vh; }
```

```css
a { width: 50cqw; }
```
