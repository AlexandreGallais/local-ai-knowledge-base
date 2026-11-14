---
title: "function-disallowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/function-disallowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# function-disallowed-list

Specify a list of disallowed functions.

```css
a { transform: scale(1); }
/**            ↑
 * This function */
```

Use this rule to enforce a convention. For example, disallow `rgb` and `hsl` in favor of `oklch`, so that all colors use one color space.

This rule supports 1 message argument: the disallowed function.

## Options

### `Array<string>`

```json
["array", "of", "functions", "/regex/"]
```

Given:

```json
{
  "function-disallowed-list": ["scale", "rgba", "/^(-moz-)?linear-gradient$/"]
}
```

The following patterns are considered problems:

```css
a { transform: scale(1); }
```

```css
a {
  color: rgba(0, 0, 0, 0.5);
}
```

```css
a {
  background:
    red,
    -moz-linear-gradient(45deg, blue, red);
}
```

The following patterns are _not_ considered problems:

```css
a { background: red; }
```
