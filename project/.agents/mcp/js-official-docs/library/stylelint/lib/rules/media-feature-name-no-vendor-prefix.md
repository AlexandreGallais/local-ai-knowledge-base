---
title: "media-feature-name-no-vendor-prefix"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/media-feature-name-no-vendor-prefix/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# media-feature-name-no-vendor-prefix

Disallow vendor prefixes for media feature names.

```css
@media (-webkit-min-device-pixel-ratio: 1) {}
/**      ↑
 * This prefix */
```

Use this rule to enforce a convention. For example, leave prefixing to a tool such as Autoprefixer, so that your styles only have the prefixes your browsers need.

This rule ignores non-standard vendor-prefixed media feature names that aren't handled by Autoprefixer.

The `fix` option can automatically fix all of the problems reported by this rule. However, it will not remove duplicate media feature names produced when the prefixes are removed. You can use Autoprefixer itself, with the `add` option off and the `remove` option on, in these situations.

This rule doesn't have any message arguments.

## Options

### `true`

```json
{
  "media-feature-name-no-vendor-prefix": true
}
```

The following patterns are considered problems:

```css
@media (-webkit-min-device-pixel-ratio: 1) {}
```

```css
@media (min--mox-device-pixel-ratio: 1) {}
```

```css
@media (-o-max-device-pixel-ratio: 1/1) {}
```

The following patterns are _not_ considered problems:

```css
@media (min-resolution: 96dpi) {}
```

```css
@media (max-resolution: 900dpi) {}
```

## Optional secondary options

### `ignoreMediaFeatureNames`

```json
{ "ignoreMediaFeatureNames": ["array", "of", "feature", "names", "/regex/"] }
```

Given:

```json
{
  "media-feature-name-no-vendor-prefix": [
    true,
    { "ignoreProperties": ["-webkit-min-device-pixel-ratio", "/^-o/"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
@media (-webkit-min-device-pixel-ratio: 1) {}
```

```css
@media (-o-device-pixel-ratio > 1) {}
```
