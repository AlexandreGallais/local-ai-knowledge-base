---
title: "font-family-no-missing-generic-family-keyword"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/font-family-no-missing-generic-family-keyword/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# font-family-no-missing-generic-family-keyword

Disallow a missing generic family keyword within font families.

```css
a { font-family: Arial, sans-serif; }
/**                     ↑
 * An example of generic family name */
```

The generic font family can be:

- placed anywhere in the font family list
- omitted if a keyword related to property inheritance or a system font is used

This rule checks the `font` and `font-family` properties.

This rule doesn't have any message arguments.

## Options

### `true`

```json
{
  "font-family-no-missing-generic-family-keyword": true
}
```

The following patterns are considered problems:

```css
a { font-family: Helvetica, Arial, Verdana, Tahoma; }
```

```css
a { font: 1em/1.3 Times; }
```

The following patterns are _not_ considered problems:

```css
a { font-family: Helvetica, Arial, Verdana, Tahoma, sans-serif; }
```

```css
a { font: 1em/1.3 Times, serif, Apple Color Emoji; }
```

```css
a { font: inherit; }
```

```css
a { font: caption; }
```

```css
a { font-family: var(--font-family-common); }
```

```css
a { font-family: Helvetica, var(--font-family-common); }
```

## Optional secondary options

### `ignoreFontFamilies`

```json
{ "ignoreFontFamilies": ["array", "of", "font-families", "/regex/"] }
```

Given:

```json
{
  "font-family-no-missing-generic-family-keyword": [
    true,
    {
      "ignoreFontFamilies": ["custom-font"]
    }
  ]
}
```

The following pattern is _not_ considered a problem:

```css
a { font-family: custom-font; }
```

The following pattern is considered a problem:

```css
a { font-family: invalid-custom-font; }
```
