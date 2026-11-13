---
title: "property-no-unknown"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/property-no-unknown/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# property-no-unknown

Disallow unknown properties.

```css
a { height: 100%; }
/** ↑
 * This property */
```

Use this rule to avoid mistyped properties, e.g. `colour`. Browsers ignore the whole declaration.

This rule considers properties defined in the CSS Specifications, up to and including Editor's Drafts, to be known.

You can filter the CSSTree Syntax Reference to find out what properties are known, and use the `languageOptions` configuration property to extend it.

This rule ignores:

- variables, e.g., `$sass`, `@less`, `--custom-property`
- vendor-prefixed properties, e.g., `-moz-overflow-scrolling` (unless `checkPrefixed` is set to `true`)

This rule supports 1 message argument: the unknown property.

## Options

### `true`

```json
{
  "property-no-unknown": true
}
```

The following patterns are considered problems:

```css
a {
  colr: blue;
}
```

```css
a {
  my-property: 1;
}
```

The following patterns are _not_ considered problems:

```css
a {
  color: green;
}
```

```css
a {
  fill: black;
}
```

```css
a {
  -moz-align-self: center;
}
```

```css
a {
  -webkit-align-self: center;
}
```

```css
a {
  align-self: center;
}
```

## Optional secondary options

### `ignoreProperties`

```json
{ "ignoreProperties": ["array", "of", "properties", "/regex/"] }
```

Given:

```json
{
  "property-no-unknown": [true, { "ignoreProperties": ["/^my-/", "custom"] }]
}
```

The following patterns are _not_ considered problems:

```css
a {
  my-property: 10px;
}
```

```css
a {
  my-other-property: 10px;
}
```

```css
a {
  custom: 10px;
}
```

### `ignoreSelectors`

```json
{ "ignoreSelectors": ["array", "of", "selectors", "/regex/"] }
```

Skips checking properties of the given selectors against this rule.

Given:

```json
{
  "property-no-unknown": [true, { "ignoreSelectors": [":root"] }]
}
```

The following patterns are _not_ considered problems:

```css
:root {
  my-property: blue;
}
```

### `ignoreAtRules`

```json
{ "ignoreAtRules": ["array", "of", "at-rules", "/regex/"] }
```

Ignores properties nested within specified at-rules.

Given:

```json
{
  "property-no-unknown": [true, { "ignoreAtRules": ["supports"] }]
}
```

The following patterns are _not_ considered problems:

```css
@supports (display: grid) {
  a {
    my-property: 1;
  }
}
```

### `checkPrefixed`

If `true`, this rule will check vendor-prefixed properties. Defaults to `false`.

Given:

```json
{
  "property-no-unknown": [true, { "checkPrefixed": true }]
}
```

The following patterns are _not_ considered problems:

```css
a {
  -webkit-overflow-scrolling: auto;
}
```

The following patterns are considered problems:

```css
a {
  -moz-overflow-scrolling: center;
}
```
