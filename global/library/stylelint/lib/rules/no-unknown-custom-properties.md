---
title: "no-unknown-custom-properties"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/no-unknown-custom-properties/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# no-unknown-custom-properties

Disallow unknown custom properties.

```css
a { color: var(--foo); }
/**            ↑
 *             This custom property */

a { color: var(--foo, var(--bar)); }
/**                       ↑
 *                        And this one */
```

This rule considers custom properties defined within the same source or within the files specified in the `referenceFiles` configuration property to be known.

This rule supports 1 message argument: the unknown custom property.

## Options

### `true`

```json
{
  "no-unknown-custom-properties": true
}
```

The following patterns are considered problems:

```css
a { color: var(--foo); }
```

```css
a { color: var(--foo, var(--bar)); }
```

The following patterns are _not_ considered problems:

```css
a { --foo: #f00; color: var(--foo); }
```

```css
a { color: var(--foo, #f00); }
```

```css
a { --foo: #f00; color: var(--bar, var(--foo)); }
```

```css
@property --foo { syntax: "<color>"; inherits: false; initial-value: #f00; }
a { color: var(--foo); }
```
