---
title: "value-type-custom-property-required-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/value-type-custom-property-required-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# value-type-custom-property-required-list

Specify a list of value types that require custom properties.

```css
a { border: 1px solid red; }
/**         ↑         ↑
 * These <length> and <color> values */
```

> **Warning:**
> This rule is **experimental**, as it's our first whose options take value types. To give feedback on them, open an issue.

Use this rule to enforce a convention. For example, require custom properties for:

- `color`, so that colors come from your palette
- `length`, so that spacing comes from your scale

For custom properties defined within the same source or within the files specified in the `referenceFiles` configuration property, this rule substitutes their declared values for the `var()`s in a value to find the types of the parts beside them. It ignores the declarations of custom properties, values that contain unknown custom properties, and the fallbacks of `var()`.

The types are those of the CSSTree Syntax Reference, without their angle brackets, e.g. `color`, `length` and `time`. You can use the `languageOptions` configuration property to extend them.

This rule supports 2 message arguments: the value and its type.

Prior art:

- stylelint-declaration-strict-value

## Options

### `Array<string>`

```json
["array", "of", "types"]
```

Given:

```json
{
  "value-type-custom-property-required-list": ["color", "length"]
}
```

The following patterns are considered problems:

```css
a { color: red; }
```

```css
a { margin: 1px; }
```

The following patterns are _not_ considered problems:

```css
a {
  color: var(--foo);
}
```

```css
a {
  margin: var(--bar);
}
```

## Optional secondary options

### `ignoreFunctions`

```json
{ "ignoreFunctions": { "type": ["array", "of", "functions", "/regex/"] } }
```

Ignore the parts of a type that are within the specified functions.

Given:

```json
{
  "value-type-custom-property-required-list": [
    ["color", "number", "angle", "percentage"],
    {
      "ignoreFunctions": {
        "number": ["/.+/"],
        "color": ["color-mix"],
        "/^(angle|percentage)$/": ["/-gradient$/"]
      }
    }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a { transform: scale(1.5); }
```

```css
a { color: color-mix(in srgb, red, blue); }
```

```css
a { background: linear-gradient(45deg, var(--foo) 0%, var(--bar) 100%); }
```

### `ignoreProperties`

```json
{ "ignoreProperties": { "type": ["array", "of", "properties", "/regex/"] } }
```

Ignore the parts of a type in the values of the specified properties.

Given:

```json
{
  "value-type-custom-property-required-list": [
    ["color", "length"],
    { "ignoreProperties": { "/.+/": ["transform"], "length": ["/^border/"] } }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a { transform: translateX(1px); }
```

```css
a { border-width: 1px; }
```

### `ignoreValues`

```json
{ "ignoreValues": ["array", "of", "values", "/regex/"] }
```

Ignore the specified parts of a value.

Given:

```json
{
  "value-type-custom-property-required-list": [
    ["color", "number"],
    { "ignoreValues": ["0", "transparent"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a { flex: 0; }
```

```css
a { color: transparent; }
```
