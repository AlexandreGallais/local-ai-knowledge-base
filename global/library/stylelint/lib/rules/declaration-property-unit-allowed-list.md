---
title: "declaration-property-unit-allowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/declaration-property-unit-allowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# declaration-property-unit-allowed-list

Specify a list of allowed property and unit pairs within declarations.

```css
a { width: 100px; }
/** ↑         ↑
 * These properties and these units */
```

This rule supports 2 message arguments: the property name and the disallowed unit.

## Options

### `Object<string, Array<string>>`

```json
{ "property-name": ["array", "of", "units"] }
```

You can specify a regex for a property name, such as `{ "/^animation/": [] }`.

Given:

```json
{
  "declaration-property-unit-allowed-list": {
    "font-size": ["em", "px"],
    "/^(-webkit-)?animation/": ["s"],
    "line-height": []
  }
}
```

The following patterns are considered problems:

```css
a { font-size: 1.2rem; }
```

```css
a { animation: animation-name 500ms ease; }
```

```css
a { -webkit-animation: animation-name 500ms ease; }
```

```css
a { animation-duration: 500ms; }
```

```css
a { line-height: 13px; }
```

The following patterns are _not_ considered problems:

```css
a { font-size: 1em; }
```

```css
a { height: 100px; }
```

```css
a { animation: animation-name 5s ease; }
```

```css
a { -webkit-animation: animation-name 5s ease; }
```

```css
a { animation-duration: 5s; }
```

```css
a { line-height: 1; }
```

## Optional secondary options

### `ignore`

```json
{ "ignore": ["array", "of", "options"] }
```

#### `"inside-function"`

Ignore units that are inside a function.

Given:

```json
{
  "declaration-property-unit-allowed-list": [
    {
      "/^border/": ["px"],
      "/^background/": ["%"]
    },
    {
      "ignore": ["inside-function"]
    }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a {
  border: 1px solid hsla(162deg, 51%, 35%, 0.8);
}
```

```css
a {
  background-image: linear-gradient(hsla(162deg, 51%, 35%, 0.8), hsla(62deg, 51%, 35%, 0.8));
}
```
