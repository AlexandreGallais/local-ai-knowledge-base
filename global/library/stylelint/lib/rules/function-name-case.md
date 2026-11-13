---
title: "function-name-case"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/function-name-case/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# function-name-case

Specify lowercase or uppercase for function names.

```css
a { width: calc(5% - 10em); }
/**        ↑
 * This function */
```

Use this rule to enforce a convention, as function names are case-insensitive. For example, require lowercase, as the specifications write them.

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
