---
title: "unit-no-unknown"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/unit-no-unknown/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# unit-no-unknown

Disallow unknown units.

```css
a { width: 100pixels; }
/**           ↑
 *  These units */
```

This rule considers units defined in the CSS Specifications, up to and including Editor's Drafts, to be known.

You can use the `languageOptions` configuration property to extend the known units.

> **Note:**
> We recommend only using this rule for CSS-like languages, such as SCSS and Less. For CSS, we recommend using these more capable and overlapping rules instead:
>
> - `at-rule-descriptor-value-no-unknown`
> - `at-rule-prelude-no-invalid`
> - `declaration-property-value-no-unknown`
> - `media-feature-name-value-no-unknown`
> - `media-query-no-invalid`

This rule supports 1 message argument: the unknown unit.

## Options

### `true`

```json
{
  "unit-no-unknown": true
}
```

The following patterns are considered problems:

```css
a {
  width: 10pixels;
}
```

```css
a {
  width: calc(10px + 10pixels);
}
```

The following patterns are _not_ considered problems:

```css
a {
  width: 10px;
}
```

```css
a {
  width: 10Px;
}
```

```css
a {
  width: 10pX;
}
```

```css
a {
  width: calc(10px + 10px);
}
```

## Optional secondary options

### `ignoreUnits`

```json
{ "ignoreUnits": ["array", "of", "units", "/regex/"] }
```

Given:

```json
{
  "unit-no-unknown": [true, { "ignoreUnits": ["/^--foo-/", "--bar"] }]
}
```

The following patterns are _not_ considered problems:

```css
a {
  width: 10--foo--baz;
}
```

```css
a {
  width: 10--bar;
}
```

### `ignoreFunctions`

```json
{ "ignoreFunctions": ["array", "of", "functions", "/regex/"] }
```

Given:

```json
{
  "unit-no-unknown": [
    true,
    { "ignoreFunctions": ["foo", "/^my-/", "/^YOUR-/i"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a {
  width: foo(1x);
}
```

```css
a {
  width: my-func(1x);
}
```

```css
a {
  width: YoUr-func(1x);
}
```
