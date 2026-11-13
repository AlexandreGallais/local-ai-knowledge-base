---
title: "custom-property-pattern"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/custom-property-pattern/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# custom-property-pattern

Specify a pattern for custom properties.

```css
a { --foo-: 1px; }
/**   ↑
 * The pattern of this */
```

Use this rule to enforce a convention. For example, require:

- kebab-case names for consistency with the specifications' examples
- a namespace, e.g. `^foo-`, so that a library's properties can't collide with a consumer's

This rule supports 2 message arguments: the custom property name and the configured pattern.

## Options

### `string`

Specify a regex string not surrounded with `"/"`.

Given:

```json
{
  "custom-property-pattern": "foo-.+"
}
```

The following patterns are considered problems:

```css
:root { --boo-bar: 0; }
```

The following patterns are _not_ considered problems:

```css
:root { --foo-bar: 0; }
```
