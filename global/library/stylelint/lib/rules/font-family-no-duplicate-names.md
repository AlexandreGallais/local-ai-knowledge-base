---
title: "font-family-no-duplicate-names"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/font-family-no-duplicate-names/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# font-family-no-duplicate-names

Disallow duplicate names within font families.

```css
a { font-family: serif, serif; }
/**              ↑      ↑
 * These font family names */
```

This rule checks the `font` and `font-family` properties.

This rule ignores `$sass`, `@less`, and `var(--custom-property)` variable syntaxes.

> **Warning:**
> This rule will stumble on _unquoted_ multi-word font names and _unquoted_ font names containing escape sequences. Wrap these font names in quotation marks, and everything should be fine.

This rule supports 1 message argument: the duplicate font family name.

## Options

### `true`

```json
{
  "font-family-no-duplicate-names": true
}
```

The following patterns are considered problems:

```css
a { font-family: 'Times', Times, serif; }
```

```css
a { font: 1em "Arial", 'Arial', sans-serif; }
```

```css
a { font: normal 14px/32px -apple-system, BlinkMacSystemFont, sans-serif, sans-serif; }
```

The following patterns are _not_ considered problems:

```css
a { font-family: Times, serif; }
```

```css
a { font: 1em "Arial", "sans-serif", sans-serif; }
```

```css
a { font: normal 14px/32px -apple-system, BlinkMacSystemFont, sans-serif; }
```

## Optional secondary options

### `ignoreFontFamilyNames`

```json
{ "ignoreFontFamilyNames": ["array", "of", "font-family-names", "/regex/"] }
```

Given:

```json
{
  "font-family-no-duplicate-names": [
    true,
    { "ignoreFontFamilyNames": ["/^My Font /", "monospace"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
font-family: monospace, monospace
```

```css
font-family: "My Font Family", "My Font Family", monospace
```
