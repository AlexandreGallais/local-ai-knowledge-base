---
title: "function-name-case"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/function-name-case/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# function-name-case

Specify lowercase or uppercase for function names.

```css
a { width: calc(5% - 10em); }
/**        ↑
 * This function */
```

Camel case function names, e.g. `translateX`, are accounted for when the `lower` option is used.

The `fix` option can automatically fix all of the problems reported by this rule.

This rule supports 2 message arguments: the function name and its expected case.

## Options

### `"lower"`

```json
{
  "function-name-case": "lower"
}
```

The following patterns are considered problems:

```css
a {
  width: Calc(5% - 10em);
}
```

```css
a {
  width: cAlC(5% - 10em);
}
```

```css
a {
  width: CALC(5% - 10em);
}
```

```css
a {
  background: -WEBKIT-RADIAL-GRADIENT(red, green, blue);
}
```

The following patterns are _not_ considered problems:

```css
a {
  width: calc(5% - 10em);
}
```

```css
a {
  background: -webkit-radial-gradient(red, green, blue);
}
```

### `"upper"`

```json
{
  "function-name-case": "upper"
}
```

The following patterns are considered problems:

```css
a {
  width: Calc(5% - 10em);
}
```

```css
a {
  width: cAlC(5% - 10em);
}
```

```css
a {
  width: calc(5% - 10em);
}
```

```css
a {
  background: -webkit-radial-gradient(red, green, blue);
}
```

The following patterns are _not_ considered problems:

```css
a {
  width: CALC(5% - 10em);
}
```

```css
a {
  background: -WEBKIT-RADIAL-GRADIENT(red, green, blue);
}
```

## Optional secondary options

### `ignoreFunctions`

```json
{ "ignoreFunctions": ["array", "of", "functions", "/regex/"] }
```

Ignore case of function names.

Given:

```json
{
  "function-name-case": [
    "lower",
    { "ignoreFunctions": ["--some-function", "/^--get.*$/"] }
  ]
}
```

The following patterns are considered problems:

```css
a {
  color: --sOmE-FuNcTiOn();
}
```

```css
a {
  color: --GetColor();
}
```

```css
a {
  color: --GET_COLOR();
}
```

The following patterns are _not_ considered problems:

```css
a {
  display: --some-function();
}
```

```css
a {
  display: --getColor();
}
```

```css
a {
  display: --get_color();
}
```
