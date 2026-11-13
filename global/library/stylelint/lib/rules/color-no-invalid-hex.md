---
title: "color-no-invalid-hex"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/color-no-invalid-hex/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# color-no-invalid-hex

Disallow invalid hex colors.

```css
a { color: #y3 }
/**        ↑
 * This hex color */
```

Longhand hex colors can be either 6 or 8 (with alpha channel) hexadecimal characters. And their shorthand variants are 3 and 4 characters respectively.

> **Note:**
> We recommend only using this rule for CSS-like languages, such as SCSS and Less. For CSS, we recommend using these more capable and overlapping rules instead:
>
> - `at-rule-descriptor-value-no-unknown`
> - `declaration-property-value-no-unknown`

This rule supports 1 message argument: the invalid hex color.

## Options

### `true`

```json
{
  "color-no-invalid-hex": true
}
```

The following patterns are considered problems:

```css
a { color: #00; }
```

```css
a { color: #fff1az; }
```

```css
a { color: #12345aa; }
```

The following patterns are _not_ considered problems:

```css
a { color: #000; }
```

```css
a { color: #000f; }
```

```css
a { color: #fff1a0; }
```

```css
a { color: #123450aa; }
```
