---
title: "hue-degree-notation"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/hue-degree-notation/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# hue-degree-notation

Specify number or angle notation for degree hues.

```css
    a { color: hsl(198deg 28% 50%) }
/**                ↑
 *                 This notation */
```

Because hues are so often given in degrees, a hue can also be given as a number, which is interpreted as a number of degrees.

The `fix` option can automatically fix all of the problems reported by this rule.

This rule supports 2 message arguments: the hue and its expected notation.

## Options

### `"angle"`

Degree hues _must always_ use angle notation.

```json
{
  "hue-degree-notation": "angle"
}
```

The following patterns are considered problems:

```css
a { color: hsl(198 28% 50%) }
```

```css
a { color: lch(56.29% 19.86 10 / 15%) }
```

The following patterns are _not_ considered problems:

```css
a { color: hsl(198deg 28% 50%) }
```

```css
a { color: lch(56.29% 19.86 10deg / 15%) }
```

### `"number"`

Degree hues _must always_ use the number notation.

```json
{
  "hue-degree-notation": "number"
}
```

The following patterns are considered problems:

```css
a { color: hsl(198deg 28% 50%) }
```

```css
a { color: lch(56.29% 19.86 10deg / 15%) }
```

The following patterns are _not_ considered problems:

```css
a { color: hsl(198 28% 50%) }
```

```css
a { color: lch(56.29% 19.86 10 / 15%) }
```
