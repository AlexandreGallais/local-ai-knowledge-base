---
title: "declaration-block-no-duplicate-custom-properties"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/declaration-block-no-duplicate-custom-properties/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# declaration-block-no-duplicate-custom-properties

Disallow duplicate custom properties within declaration blocks.

```css
a { --custom-property: pink; --custom-property: orange; }
/** ↑                        ↑
 * These duplicated custom properties */
```

Use this rule to avoid declarations that never apply. Browsers don't check custom property values when parsing, so a repeated custom property always overrides the earlier one, which can't act as a fallback.

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
