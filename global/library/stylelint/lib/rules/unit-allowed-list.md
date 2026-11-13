---
title: "unit-allowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/unit-allowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# unit-allowed-list

Specify a list of allowed units.

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
  "unit-allowed-list": ["px", "em", "deg"]
}
```

The following patterns are considered problems:

```css
a { width: 100%; }
```

```css
a { font-size: 10rem; }
```

```css
a { animation: animation-name 5s ease; }
```

The following patterns are _not_ considered problems:

```css
a { font-size: 1.2em; }
```

```css
a { line-height: 1.2; }
```

```css
a { height: 100px; }
```

```css
a { height: 100PX; }
```

```css
a { transform: rotate(30deg); }
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
  "unit-allowed-list": [
    ["px", "em"],
    {
      "ignoreProperties": {
        "rem": ["line-height", "/^border/"],
        "%": ["width"]
      }
    }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a { line-height: 0.1rem; }
```

```css
a { border-bottom-width: 6rem; }
```

```css
a { width: 100%; }
```

The following patterns are considered problems:

```css
a { margin: 0 20rem; }
```

```css
a { -moz-border-radius-topright: 20rem; }
```

```css
a { height: 100%; }
```

### `ignoreFunctions`

```json
{ "ignoreFunctions": ["array", "of", "functions", "/regex/"] }
```

Ignore units that are inside of the specified functions.

Given:

```json
{
  "unit-allowed-list": [["px", "em"], { "ignoreFunctions": ["/^hsl/", "calc"] }]
}
```

The following patterns are _not_ considered problems:

```css
a {
  border: 1px solid hsl(162deg, 51%, 35%, 0.8);
}
```

```css
a {
  background-image: linear-gradient(hsla(162deg, 51%, 35%, 0.8), hsla(62deg, 51%, 35%, 0.8));
}
```

```css
a {
  width: calc(100% - 10px);
}
```
