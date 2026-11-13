---
title: "media-feature-name-no-unknown"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/media-feature-name-no-unknown/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# media-feature-name-no-unknown

Disallow unknown media feature names.

```css
@media (min-width: 700px) {}
/**     ↑
 * This media feature name */
```

This rule considers media feature names defined in the CSS Specifications, up to and including Editor's Drafts, to be known.

This rule ignores vendor-prefixed media feature names.

This rule supports 1 message argument: the unknown media feature name.

## Options

### `true`

```json
{
  "media-feature-name-no-unknown": true
}
```

The following patterns are considered problems:

```css
@media screen and (unknown) {}
```

```css
@media screen and (unknown: 10px) {}
```

```css
@media screen and (unknown > 10px) {}
```

The following patterns are _not_ considered problems:

```css
@media all and (monochrome) {}
```

```css
@media (min-width: 700px) {}
```

```css
@media (MIN-WIDTH: 700px) {}
```

```css
@media (min-width: 700px) and (orientation: landscape) {}
```

```css
@media (-webkit-min-device-pixel-ratio: 2) {}
```

## Optional secondary options

### `ignoreMediaFeatureNames`

```json
{ "ignoreMediaFeatureNames": ["array", "of", "media-features", "/regex/"] }
```

Given:

```json
{
  "media-feature-name-no-unknown": [
    true,
    { "ignoreMediaFeatureNames": ["/^my-/", "custom"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
@media screen and (my-media-feature-name) {}
```

```css
@media screen and (custom: 10px) {}
```

```css
@media screen and (100px < custom < 700px) {}
```

```css
@media (min-width: 700px) and (custom: 10px) {}
```
