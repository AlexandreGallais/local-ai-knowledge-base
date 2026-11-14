---
title: "hue-degree-notation"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/hue-degree-notation/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# hue-degree-notation

Specify number or angle notation for degree hues.

```css
    a { color: hsl(198deg 28% 50%) }
/**                ↑
 *                 This notation */
```

Use this rule to enforce a convention. A hue can be an angle or a number, which is interpreted as degrees.

Choose:

- `"angle"` for clarity
- `"number"` for brevity

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
