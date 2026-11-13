---
title: "media-feature-name-value-no-unknown"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/media-feature-name-value-no-unknown/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# media-feature-name-value-no-unknown

Disallow unknown values for media features.

```css
@media (color: red) {}
/**     ↑      ↑
 * feature and value pairs like these */
```

This rule considers values for media features defined within the CSS specifications to be known.

> **Warning:**
> This rule is only appropriate for CSS. You should not turn it on for CSS-like languages, such as SCSS or Less.

> **Note:**
> When using this rule, we recommend turning off these overlapping rules or configuring them to ignore the overlaps:
>
> - `unit-no-unknown`

If duplicate problems are flagged, you can turn off the corresponding rule.

This rule supports 2 message arguments: the media feature name and the unknown value.

## Options

### `true`

```json
{
  "media-feature-name-value-no-unknown": true
}
```

The following patterns are considered problems:

```css
@media (color: red) { top: 1px; }
```

```css
@media (width: 10) { top: 1px; }
```

```css
@media (width: auto) { top: 1px; }
```

The following patterns are _not_ considered problems:

```css
@media (color: 8) { top: 1px; }
```

```css
@media (width: 10px) { top: 1px; }
```

## Optional secondary options

### `ignoreMediaFeatureNameValues`

```json
{
  "ignoreMediaFeatureNameValues": {
    "media-feature-name": ["array", "of", "values", "/regex/"]
  }
}
```

Ignore the specified media feature name and value pairs. You can specify a regex for a media feature name, such as `{ "/^color/": [] }`.

Given:

```json
{
  "media-feature-name-value-no-unknown": [
    true,
    {
      "ignoreMediaFeatureNameValues": {
        "/^color/": ["--foo", "/^--bar/"]
      }
    }
  ]
}
```

The following patterns are _not_ considered problems:

```css
@media (color: --foo) {}
```

```css
@media (color-gamut: --bar-baz) {}
```
