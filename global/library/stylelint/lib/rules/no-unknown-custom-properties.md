---
title: "no-unknown-custom-properties"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/no-unknown-custom-properties/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
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

Use this rule to avoid custom properties in `var()` that match no definition. Browsers reset the property to its initial or inherited value when there is no fallback.

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
