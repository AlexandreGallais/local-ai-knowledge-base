---
title: "media-query-no-invalid"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/media-query-no-invalid/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# media-query-no-invalid

Disallow invalid media queries.

```css
@media not(min-width: 300px) {}
/**    ↑
 * This media query */
```

Media queries must be grammatically valid according to the Media Queries Level 5 specification.

It works well with other rules that validate feature names and values:

- `media-feature-name-no-unknown`
- `media-feature-name-value-no-unknown`

> **Warning:**
> This rule is only appropriate for CSS. You should not turn it on for CSS-like languages, such as SCSS or Less.

This rule supports 2 message arguments: the media query and the reason it is invalid.

## Options

### `true`

```json
{
  "media-query-no-invalid": true
}
```

The following patterns are considered problems:

```css
@media not(min-width: 300px) {}
```

```css
@media (width == 100px) {}
```

```css
@media (color) and (hover) or (width) {}
```

The following patterns are _not_ considered problems:

```css
@media not (min-width: 300px) {}
```

```css
@media (width = 100px) {}
```

```css
@media ((color) and (hover)) or (width) {}
```

```css
@media (color) and ((hover) or (width)) {}
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
  "media-query-no-invalid": [
    true,
    { "ignoreFunctions": ["theme", "/^get.*$/"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
@media (min-width: theme(screens.md)) {}
```

```css
@media (max-width: get-default-width()) {}
```
