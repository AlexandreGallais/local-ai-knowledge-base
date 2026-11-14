---
title: "color-no-invalid-hex"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/color-no-invalid-hex/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# color-no-invalid-hex

Disallow invalid hex colors.

```css
a { color: #y3 }
/**        ↑
 * This hex color */
```

Use this rule to avoid declarations that browsers ignore. An invalid hex color, e.g. `#ff`, invalidates the whole declaration.

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
