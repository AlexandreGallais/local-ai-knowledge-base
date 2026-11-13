---
title: "value-no-vendor-prefix"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/value-no-vendor-prefix/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# value-no-vendor-prefix

Disallow vendor prefixes for values.

```css
a { display: -webkit-flex; }
/**           ↑
 *  This prefix */
```

This rule does not fix vendor-prefixed values that weren't handled by Autoprefixer version 10.2.5. Exceptions may be added on a case by case basis.

The `fix` option can automatically fix all of the problems reported by this rule. However, it will not remove duplicate values produced when the prefixes are removed. You can use Autoprefixer itself, with the `add` option off and the `remove` option on, in these situations.

This rule supports 1 message argument: the vendor-prefixed value.

## Options

### `true`

```json
{
  "value-no-vendor-prefix": true
}
```

The following patterns are considered problems:

```css
a { display: -webkit-flex; }
```

```css
a { max-width: -moz-max-content; }
```

```css
a { background: -webkit-linear-gradient(bottom, #000, #fff); }
```

The following patterns are _not_ considered problems:

```css
a { display: flex; }
```

```css
a { max-width: max-content; }
```

```css
a { background: linear-gradient(bottom, #000, #fff); }
```

## Optional secondary options

### `ignoreValues`

```json
{ "ignoreValues": ["array", "of", "values", "/regex/"] }
```

Given:

```json
{
  "value-no-vendor-prefix": [
    true,
    { "ignoreValues": ["-webkit-grab", "/^-moz-all$/"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a { cursor: -webkit-grab; }
```

```css
a { -moz-user-select: -moz-all; }
```
