---
title: "custom-property-pattern"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/custom-property-pattern/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# custom-property-pattern

Specify a pattern for custom properties.

```css
a { --foo-: 1px; }
/**   ↑
 * The pattern of this */
```

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
