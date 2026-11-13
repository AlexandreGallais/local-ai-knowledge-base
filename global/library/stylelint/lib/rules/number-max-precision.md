---
title: "number-max-precision"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/number-max-precision/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# number-max-precision

Limit the number of decimal places allowed in numbers.

```css
a { top: 3.245634px; }
/**           ↑
 * This decimal place */
```

This rule supports 2 message arguments: the number and its rounded equivalent.

## Options

### `number`

Specify a maximum number of decimal places allowed.

Given:

```json
{
  "number-max-precision": 2
}
```

The following patterns are considered problems:

```css
a { top: 3.245px; }
```

```css
a { top: 3.245634px; }
```

```css
@media (min-width: 3.234em) {}
```

The following patterns are _not_ considered problems:

```css
a { top: 3.24px; }
```

```css
@media (min-width: 3.23em) {}
```

## Optional secondary options

### `ignoreProperties`

```json
{ "ignoreProperties": ["array", "of", "properties", "/regex/"] }
```

Ignore the precision of numbers for the specified properties.

Given:

```json
{
  "number-max-precision": [0, { "ignoreProperties": ["transition"] }]
}
```

The following patterns are considered problems:

```css
a { top: 10.5px; }
```

The following patterns are _not_ considered problems:

```css
a { transition: all 4.5s ease; }
```

### `ignoreUnits`

```json
{ "ignoreUnits": ["array", "of", "units", "/regex/"] }
```

Ignore the precision of numbers for values with the specified units.

Given:

```json
{
  "number-max-precision": [2, { "ignoreUnits": ["/^my-/", "%"] }]
}
```

The following patterns are considered problems:

```css
a { top: 3.245px; }
```

```css
a { top: 3.245634px; }
```

```css
@media (min-width: 3.234em) {}
```

The following patterns are _not_ considered problems:

```css
a { top: 3.245%; }
```

```css
@media (min-width: 3.23em) {}
```

```css
a {
  width: 10.5432%;
}
```

```css
a { top: 3.245my-unit; }
```

```css
a {
  width: 10.989my-other-unit;
}
```

### `insideFunctions`

```json
{ "insideFunctions": { "function-name": 0 } }
```

You can specify a regex for a function name, such as `{ "/^(oklch|oklab)$/": 0 }`.

The `insideFunctions` option can change a primary option value for specified functions.

Given:

```json
{
  "number-max-precision": [
    2,
    { "insideFunctions": { "/^(oklch|oklab|lch|lab)$/": 4 } }
  ]
}
```

The following patterns are considered problems:

```css
a { color: rgb(127.333 0 0); }
```

```css
a { color: rgb(calc(127.333 / 3) 0 0); }
```

The following patterns are _not_ considered problems:

```css
a { color: oklch(0.333 0 0); }
```

```css
a { color: lab(0.3333 0 0); }
```

```css
a { color: oklab(calc(127.333 / 3) 0 0); }
```
