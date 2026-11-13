---
title: "value-keyword-layout-mappings"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/value-keyword-layout-mappings/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# value-keyword-layout-mappings

Specify flow-relative or physical layout mappings for value keywords.

```css
a { float: left; }
/**        ↑
 *         This keyword */
```

Use this rule to enforce a convention. Physical keywords like `left` and `top` are tied to the screen, while flow-relative keywords like `inline-start` and `block-start` follow the writing mode.

Choose:

- `"flow-relative"` to support right-to-left and vertical writing modes
- `"physical"` if you support only one writing mode, or for older browsers

The `fix` option can automatically fix problems reported by this rule when both the primary option is `"flow-relative"` and the `languageOptions.directionality` configuration property is configured.

This rule supports 2 message arguments: the disallowed mapping and the keyword, or the physical keyword and its flow-relative equivalent.

Prior art:

- stylelint-plugin-logical-css
- stylelint-use-logical
- stylelint-use-logical-spec

## Options

### `"flow-relative"`

Layout mappings for value keywords _must always_ be flow-relative.

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
  "value-keyword-layout-mappings": "flow-relative"
}
```

The following patterns are considered problems:

```css
a { float: left; }
```

```css
a { text-align: right; }
```

```css
a { resize: horizontal; }
```

The following patterns are _not_ considered problems:

```css
a { float: inline-start; }
```

```css
a { text-align: end; }
```

```css
a { resize: inline; }
```

### `"physical"`

Layout mappings for value keywords _must always_ be physical.

Given:

```json
{
  "value-keyword-layout-mappings": "physical"
}
```

The following patterns are considered problems:

```css
a { float: inline-start; }
```

```css
a { text-align: start; }
```

```css
a { resize: inline; }
```

The following patterns are _not_ considered problems:

```css
a { float: left; }
```

```css
a { text-align: right; }
```

```css
a { resize: horizontal; }
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
  "value-keyword-layout-mappings": [
    "flow-relative",
    { "ignoreProperties": ["text-align", "/^offset-/"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a { text-align: left; }
```

```css
a { offset-anchor: top left; }
```

### `ignoreKeywords`

Ignore the specified keywords.

```json
{ "ignoreKeywords": ["array", "of", "keywords", "/regex/"] }
```

Given:

```json
{
  "value-keyword-layout-mappings": [
    "flow-relative",
    { "ignoreKeywords": ["left", "/^hor/"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a { float: left; }
```

```css
a { resize: horizontal; }
```
