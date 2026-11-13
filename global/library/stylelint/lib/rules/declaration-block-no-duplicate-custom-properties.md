---
title: "declaration-block-no-duplicate-custom-properties"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/declaration-block-no-duplicate-custom-properties/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# declaration-block-no-duplicate-custom-properties

Disallow duplicate custom properties within declaration blocks.

```css
a { --custom-property: pink; --custom-property: orange; }
/** ↑                        ↑
 * These duplicated custom properties */
```

This rule is case-sensitive.

This rule supports 1 message argument: the duplicate custom property.

## Options

### `true`

```json
{
  "declaration-block-no-duplicate-custom-properties": true
}
```

The following patterns are considered problems:

```css
a { --custom-property: pink; --custom-property: orange; }
```

```css
a { --custom-property: pink; background: orange; --custom-property: orange }
```

The following patterns are _not_ considered problems:

```css
a { --custom-property: pink; }
```

```css
a { --custom-property: pink; --cUstOm-prOpErtY: orange; }
```

## Optional secondary options

### `ignoreProperties`

```json
{ "ignoreProperties": ["array", "of", "properties", "/regex/"] }
```

Ignore duplicates of specific properties.

Given:

```json
{
  "declaration-block-no-duplicate-custom-properties": [
    true,
    { "ignoreProperties": ["--custom-property", "/ignored/"] }
  ]
}
```

The following patterns are considered problems:

```css
a { --another-custom-property: 1; --another-custom-property: 1; }
```

The following patterns are _not_ considered problems:

```css
a { --custom-property: 1; --custom-property: 1; }
```

```css
a { --custom-ignored-property: 1; --custom-ignored-property: 1; }
```
