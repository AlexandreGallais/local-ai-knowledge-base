---
title: "unit-layout-mappings"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/unit-layout-mappings/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# unit-layout-mappings

Specify flow-relative or physical layout mappings for units.

```css
a { width: 100vw; }
/**           ↑
 *            This unit */
```

Use this rule to enforce a convention. Physical units like `vw` and `vh` are tied to the viewport, while flow-relative units like `vi` and `vb` follow the writing mode.

Choose:

- `"flow-relative"` to support right-to-left and vertical writing modes
- `"physical"` if you support only one writing mode, or for older browsers

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
