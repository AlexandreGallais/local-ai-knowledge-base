---
title: "function-linear-gradient-no-nonstandard-direction"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/function-linear-gradient-no-nonstandard-direction/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# function-linear-gradient-no-nonstandard-direction

Disallow non-standard direction values for linear gradient functions.

```css
.foo { background: linear-gradient(to top, #fff, #000); }
/**                                ↑
 * This (optional) first argument is the "direction" */
```

A valid and standard direction value is one of the following:

- an angle
- `to` plus a side-or-corner (`to top`, `to bottom`, `to left`, `to right`; `to top right`, `to right top`, `to bottom left`, etc.)

A common mistake (matching outdated non-standard syntax) is to use just a side-or-corner without the preceding `to`.

> **Note:**
> We recommend only using this rule for CSS-like languages, such as SCSS and Less. For CSS, we recommend using these more capable and overlapping rules instead:
>
> - `at-rule-descriptor-value-no-unknown`
> - `declaration-property-value-no-unknown`

This rule doesn't have any message arguments.

## Options

### `true`

```json
{
  "function-linear-gradient-no-nonstandard-direction": true
}
```

The following patterns are considered problems:

```css
.foo { background: linear-gradient(top, #fff, #000); }
```

```css
.foo { background: linear-gradient(bottom, #fff, #000); }
```

```css
.foo { background: linear-gradient(left, #fff, #000); }
```

```css
.foo { background: linear-gradient(45, #fff, #000); }
```

```css
.foo { background: linear-gradient(to top top, #fff, #000); }
```

The following patterns are _not_ considered problems:

```css
.foo { background: linear-gradient(to top, #fff, #000); }
```

```css
.foo { background: linear-gradient(to bottom right, #fff, #000); }
```

```css
.foo { background: linear-gradient(45deg, #fff, #000); }
```

```css
.foo { background: linear-gradient(1.57rad, #fff, #000); }
```

```css
/* Direction defaults to "to bottom" */
.foo { background: linear-gradient(#fff, #000); }
```
