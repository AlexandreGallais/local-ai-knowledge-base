---
title: "unit-disallowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/unit-disallowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# unit-disallowed-list

Specify a list of disallowed units.

```css
a { width: 100px; }
/**           ↑
 *  These units */
```

This rule supports 1 message argument: the disallowed unit.

## Options

### `Array<string>`

```json
["array", "of", "units"]
```

Given:

```json
{
  "unit-disallowed-list": ["px", "em", "deg"]
}
```

The following patterns are considered problems:

```css
a { width: 100px; }
```

```css
a { font-size: 10em; }
```

```css
a { transform: rotate(30deg); }
```

The following patterns are _not_ considered problems:

```css
a { font-size: 1.2rem; }
```

```css
a { line-height: 1.2; }
```

```css
a { height: 100vmin; }
```

```css
a { animation: animation-name 5s ease; }
```

## Optional secondary options

### `ignoreProperties`

```json
{ "ignoreProperties": { "unit": ["array", "of", "properties", "/regex/"] } }
```

Ignore units in the values of declarations with the specified properties.

Given:

```json
{
  "unit-disallowed-list": [
    ["px", "vmin"],
    {
      "ignoreProperties": {
        "px": ["font-size", "/^border/"],
        "vmin": "width"
      }
    }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a { font-size: 13px; }
```

```css
a { border-bottom-width: 6px; }
```

```css
a { width: 100vmin; }
```

The following patterns are considered problems:

```css
a { line-height: 12px; }
```

```css
a { -moz-border-radius-topright: 40px; }
```

```css
a { height: 100vmin; }
```

### `ignoreMediaFeatureNames`

```json
{
  "ignoreMediaFeatureNames": {
    "unit": ["array", "of", "feature-names", "/regex/"]
  }
}
```

Ignore units for specific feature names.

Given:

```json
{
  "unit-disallowed-list": [
    ["px", "dpi"],
    {
      "ignoreMediaFeatureNames": {
        "px": ["min-width", "/height$/"],
        "dpi": "resolution"
      }
    }
  ]
}
```

The following patterns are _not_ considered problems:

```css
@media (min-width: 960px) {}
```

```css
@media (max-height: 280px) {}
```

```css
@media not (resolution: 300dpi) {}
```

The following patterns are considered problems:

```css
@media screen and (max-device-width: 500px) {}
```

```css
@media all and (min-width: 500px) and (max-width: 200px) {}
```

```css
@media print and (max-resolution: 100dpi) {}
```

### `ignoreFunctions`

```json
{ "ignoreFunctions": { "unit": ["array", "of", "functions", "/regex/"] } }
```

Ignore units that are inside of the specified functions.

Given:

```json
{
  "unit-disallowed-list": [
    ["px"],
    { "ignoreFunctions": ["calc", "/^translate/"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a { margin: calc(50% - 100px) }
```

```css
a { transform: translateX(100px) }
```
