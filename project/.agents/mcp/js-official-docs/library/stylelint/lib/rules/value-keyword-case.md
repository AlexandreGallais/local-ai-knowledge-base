---
title: "value-keyword-case"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/value-keyword-case/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# value-keyword-case

Specify lowercase or uppercase for keywords values.

```css
    a { display: block; }
/**              ↑
 *    These values */
```

Use this rule to enforce a convention, as keywords are case-insensitive. For example, require lowercase, as the specifications write them.

This rule ignores `<custom-idents>` of known properties. Keyword values which are paired with non-properties (e.g. `$vars` and custom properties), and do not conform to the primary option, can be ignored using the `ignoreKeywords: []` secondary option.

The `fix` option can automatically fix all of the problems reported by this rule.

This rule supports 2 message arguments: the keyword and its expected case.

## Options

### `"lower"`

```json
{
  "value-keyword-case": "lower"
}
```

The following patterns are considered problems:

```css
a {
  display: Block;
}
```

```css
a {
  display: bLoCk;
}
```

```css
a {
  display: BLOCK;
}
```

```css
a {
  transition: -WEBKIT-TRANSFORM 2s;
}
```

The following patterns are _not_ considered problems:

```css
a {
  display: block;
}
```

```css
a {
  transition: -webkit-transform 2s;
}
```

### `"upper"`

```json
{
  "value-keyword-case": "upper"
}
```

The following patterns are considered problems:

```css
a {
  display: Block;
}
```

```css
a {
  display: bLoCk;
}
```

```css
a {
  display: block;
}
```

```css
a {
  transition: -webkit-transform 2s;
}
```

The following patterns are _not_ considered problems:

```css
a {
  display: BLOCK;
}
```

```css
a {
  transition: -WEBKIT-TRANSFORM 2s;
}
```

## Optional secondary options

### `ignoreKeywords`

```json
{ "ignoreKeywords": ["array", "of", "keywords", "/regex/"] }
```

Ignore case of keywords values.

Given:

```json
{
  "value-keyword-case": [
    "lower",
    { "ignoreKeywords": ["Block", "/^(f|F)lex$/"] }
  ]
}
```

The following patterns are considered problems:

```css
a {
  display: bLoCk;
}
```

```css
a {
  display: BLOCK;
}
```

```css
a {
  display: fLeX;
}
```

```css
a {
  display: FLEX;
}
```

The following patterns are _not_ considered problems:

```css
a {
  display: block;
}
```

```css
a {
  display: Block;
}
```

```css
a {
  display: flex;
}
```

```css
a {
  display: Flex;
}
```

### `ignoreProperties`

```json
{ "ignoreProperties": ["array", "of", "properties", "/regex/"] }
```

Ignore case of the values of the listed properties.

Given:

```json
{
  "value-keyword-case": [
    "lower",
    { "ignoreProperties": ["/^(b|B)ackground$/", "display"] }
  ]
}
```

The following patterns are considered problems:

```css
a {
  text-align: LEFT;
}
```

```css
a {
  text-align: Left;
}
```

The following patterns are _not_ considered problems:

```css
a {
  display: bloCk;
}
```

```css
a {
  display: BloCk;
}
```

```css
a {
  display: BLOCK;
}
```

```css
a {
  display: block;
}
```

```css
a {
  background: Red;
}
```

```css
a {
  Background: deepPink;
}
```

### `ignoreFunctions`

```json
{ "ignoreFunctions": ["array", "of", "functions", "/regex/"] }
```

Ignore case of the values inside the listed functions.

Given:

```json
{
  "value-keyword-case": ["upper", { "ignoreFunctions": ["/^(f|F)oo$/", "t"] }]
}
```

The following patterns are considered problems:

```css
a {
  display: b(inline);
}
```

```css
a {
  color: bar(--camelCase);
}
```

The following patterns are _not_ considered problems:

```css
a {
  display: t(flex);
}
```

```css
a {
  display: t(fLeX);
}
```

```css
a {
  color: t(--camelCase);
}
```

```css
a {
  color: foo(--camelCase);
}
```

```css
a {
  color: Foo(--camelCase);
}
```

### `camelCaseSvgKeywords`

If `true`, this rule expects SVG keywords to be camel case when the primary option is `"lower"`. Defaults to `false`.

Given:

```json
{
  "value-keyword-case": ["lower", { "camelCaseSvgKeywords": true }]
}
```

The following pattern is _not_ considered a problem:

```css
a {
  color: currentColor;
}
```

The following pattern is considered a problem:

```css
a {
  color: currentcolor;
}
```
