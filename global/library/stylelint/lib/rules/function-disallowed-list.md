---
title: "function-disallowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/function-disallowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# function-disallowed-list

Specify a list of disallowed functions.

```css
a { transform: scale(1); }
/**            ↑
 * This function */
```

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
