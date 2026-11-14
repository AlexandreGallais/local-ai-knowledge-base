---
title: "declaration-property-custom-property-allowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/declaration-property-custom-property-allowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# declaration-property-custom-property-allowed-list

Specify a list of allowed property and custom property pairs within declarations.

```css
a { color: var(--foo); }
/** ↑          ↑
 * These properties and these custom properties */
```

Use this rule to enforce a subset of custom properties for a property as a convention. For example, allow only:

- `/^--radius-/` for `/radius$/`, so that only radius tokens are used for radii
- `/^--space-/` for `/^(margin|padding|gap)/`, so that only spacing tokens are used for spacing

This rule supports 2 message arguments: the property name and the disallowed custom property.

## Options

### `Object<string, Array<string>>`

```json
{ "property-name": ["array", "of", "custom-properties", "/regex/"] }
```

You can specify a regex for a property name, such as `{ "/^animation/": [] }`.

Given:

```json
{
  "declaration-property-custom-property-allowed-list": {
    "/color/": ["/^--foo-/"],
    "border": ["/^--foo-/", "--bar"]
  }
}
```

The following patterns are considered problems:

```css
a { color: var(--bar); }
```

```css
a { background-color: var(--bar); }
```

```css
a { border: var(--baz) solid var(--qux); }
```

The following patterns are _not_ considered problems:

```css
a { color: var(--foo-baz); }
```

```css
a { background-color: var(--foo-baz); }
```

```css
a { border: var(--foo-baz) solid var(--bar); }
```
