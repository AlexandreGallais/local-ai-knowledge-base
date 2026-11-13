---
title: "declaration-block-no-duplicate-properties"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/declaration-block-no-duplicate-properties/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# declaration-block-no-duplicate-properties

Disallow duplicate properties within declaration blocks.

```css
a { color: pink; color: orange; }
/** ↑            ↑
 * These duplicated properties */
```

Use this rule to avoid declarations that never apply. Browsers use the last declaration they accept, so an earlier duplicate applies only as a fallback for older browsers.

This rule ignores variables (`$sass`, `@less`, `--custom-property`).

The `fix` option can automatically fix all of the problems reported by this rule.

This rule supports 1 message argument: the duplicate property.

## Options

### `true`

```json
{
  "declaration-block-no-duplicate-properties": true
}
```

The following patterns are considered problems:

```css
a { color: pink; color: orange; }
```

```css
a { color: pink; background: orange; color: orange }
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }
```

```css
a { color: pink; background: orange; }
```

## Optional secondary options

### `ignore`

```json
{ "ignore": ["array", "of", "options"] }
```

#### `"consecutive-duplicates"`

Ignore consecutive duplicated properties.

```json
{
  "declaration-block-no-duplicate-properties": [
    true,
    { "ignore": ["consecutive-duplicates"] }
  ]
}
```

They can prove to be useful fallbacks for older browsers.

The following patterns are considered problems:

```css
p {
  font-size: 16px;
  font-weight: 400;
  font-size: 1rem;
}
```

The following patterns are _not_ considered problems:

```css
p {
  font-size: 16px;
  font-size: 1rem;
  font-weight: 400;
}
```

#### `"consecutive-duplicates-with-different-values"`

Ignore consecutive duplicated properties with different values.

```json
{
  "declaration-block-no-duplicate-properties": [
    true,
    { "ignore": ["consecutive-duplicates-with-different-values"] }
  ]
}
```

Including duplicate properties (fallbacks) is useful to deal with older browsers support for CSS properties. E.g. using `px` units when `rem` isn't available.

The following patterns are considered problems:

```css
/* properties with the same value */
p {
  font-size: 16px;
  font-size: 16px;
  font-weight: 400;
}
```

```css
/* nonconsecutive duplicates */
p {
  font-size: 16px;
  font-weight: 400;
  font-size: 1rem;
}
```

The following patterns are _not_ considered problems:

```css
p {
  font-size: 16px;
  font-size: 1rem;
  font-weight: 400;
}
```

#### `"consecutive-duplicates-with-different-syntaxes"`

Ignore consecutive duplicated properties with different value syntaxes (type and unit of value).

```json
{
  "declaration-block-no-duplicate-properties": [
    true,
    { "ignore": ["consecutive-duplicates-with-different-syntaxes"] }
  ]
}
```

The following patterns are considered problems:

```css
/* properties with the same value syntax */
p {
  font-size: 16px;
  font-size: 14px;
  font-weight: 400;
}
```

The following patterns are _not_ considered problems:

```css
p {
  font-size: 16px;
  font-size: 16rem;
  font-weight: 400;
}
```

#### `"consecutive-duplicates-with-same-prefixless-values"`

Ignore consecutive duplicated properties with identical values, when ignoring their prefix.

```json
{
  "declaration-block-no-duplicate-properties": [
    true,
    { "ignore": ["consecutive-duplicates-with-same-prefixless-values"] }
  ]
}
```

This option is useful to deal with draft CSS values while still being future proof. E.g. using `fit-content` and `-moz-fit-content`.

The following patterns are considered problems:

```css
/* nonconsecutive duplicates */
p {
  width: fit-content;
  height: 32px;
  width: -moz-fit-content;
}
```

```css
/* properties with different prefixless values */
p {
  width: -moz-fit-content;
  width: 100%;
}
```

The following patterns are _not_ considered problems:

```css
p {
  width: -moz-fit-content;
  width: fit-content;
}
```

### `ignoreProperties`

```json
{ "ignoreProperties": ["array", "of", "properties", "/regex/"] }
```

Ignore duplicates of specific properties.

Given:

```json
{
  "declaration-block-no-duplicate-properties": [
    true,
    { "ignoreProperties": ["color", "/background-/"] }
  ]
}
```

The following patterns are considered problems:

```css
a { color: pink; background: orange; background: white; }
```

```css
a { background: orange; color: pink; background: white; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink; color: orange; background-color: orange; background-color: white; }
```

```css
a { color: pink; background-color: orange; color: orange; background-color: white; }
```
