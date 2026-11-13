---
title: "property-no-vendor-prefix"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/property-no-vendor-prefix/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# property-no-vendor-prefix

Disallow vendor prefixes for properties.

```css
a { -webkit-transform: scale(1); }
/**  ↑
 * This prefix */
```

This rule ignores non-standard vendor-prefixed properties that aren't handled by Autoprefixer.

The `fix` option can automatically fix all of the problems reported by this rule. However, it will not remove duplicate properties produced when the prefixes are removed. You can use Autoprefixer itself, with the `add` option off and the `remove` option on, in these situations.

This rule supports 1 message argument: the vendor-prefixed property.

## Options

### `true`

```json
{
  "property-no-vendor-prefix": true
}
```

The following patterns are considered problems:

```css
a { -webkit-transform: scale(1); }
```

```css
a { -moz-columns: 2; }
```

The following patterns are _not_ considered problems:

```css
a { transform: scale(1); }
```

```css
a { columns: 2; }
```

```css
a { -webkit-touch-callout: none; }
```

## Optional secondary options

### `ignoreProperties`

```json
{ "ignoreProperties": ["array", "of", "properties", "/regex/"] }
```

Given:

```json
{
  "property-no-vendor-prefix": [
    true,
    { "ignoreProperties": ["-webkit-transform", "/^-moz-col/"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a { -webkit-transform: scale(1); }
```

```css
a { -moz-columns: 2; }
```
