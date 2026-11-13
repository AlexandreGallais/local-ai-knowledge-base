---
title: "function-allowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/function-allowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# function-allowed-list

Specify a list of allowed functions.

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
  "function-allowed-list": ["scale", "rgba", "/^(-moz-)?linear-gradient$/"]
}
```

The following patterns are considered problems:

```css
a { transform: rotate(1); }
```

```css
a {
  color: hsla(170, 50%, 45%, 1)
}
```

```css
a {
  background:
    red,
    -webkit-radial-gradient(red, green, blue);
}
```

The following patterns are _not_ considered problems:

```css
a { background: red; }
```

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

## Optional secondary options

### `exceptWithoutPropertyFallback`

```json
{
  "exceptWithoutPropertyFallback": ["array", "of", "functions", "/regex/"]
}
```

Disallow the matching functions when they are without a property fallback in the same declaration block.

Given:

```json
{
  "function-allowed-list": [
    ["scale", "min", "/max/"],
    { "exceptWithoutPropertyFallback": ["min", "/max/"] }
  ]
}
```

The following patterns are considered problems:

```css
a { width: min(50%, 100px); }
```

```css
a { height: max(50%, 100px); }
```

```css
a {
  width: max(50%, 100px);
  width: 100px;
}
```

The following patterns are _not_ considered problems:

```css
a { transform: scale(1); }
```

```css
a {
  width: 100px;
  width: min(50%, 100px);
}
```
