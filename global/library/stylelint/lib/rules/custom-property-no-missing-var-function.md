---
title: "custom-property-no-missing-var-function"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/custom-property-no-missing-var-function/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# custom-property-no-missing-var-function

Disallow missing `var` function for custom properties.

```css
    :root { --foo: red; }
    a { color: --foo; }
/**            ↑
 *             This custom property */
```

This rule has the following limitations:

- It only reports custom properties that are defined within the same source.
- It does not check properties that can contain author-defined identifiers, e.g. `transition-property`.

This rule supports 1 message argument: the custom property.

## Options

### `true`

```json
{
  "custom-property-no-missing-var-function": true
}
```

The following patterns are considered problems:

```css
:root { --foo: red; }
a { color: --foo; }
```

```css
@property --foo {}
a { color: --foo; }
```

The following patterns are _not_ considered problems:

```css
:root { --foo: red; }
a { color: var(--foo); }
```

```css
@property --foo {}
a { color: var(--foo); }
```

```css
@property --foo {}
a { transition-property: --foo; }
```
