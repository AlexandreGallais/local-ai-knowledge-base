---
title: "property-no-vendor-prefix"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/property-no-vendor-prefix/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# property-no-vendor-prefix

Disallow vendor prefixes for properties.

```css
a { -webkit-transform: scale(1); }
/**  ↑
 * This prefix */
```

Use this rule to enforce a convention. For example, leave prefixing to a tool such as Autoprefixer, so that your styles only have the prefixes your browsers need.

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
