---
title: "property-allowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/property-allowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# property-allowed-list

Specify a list of allowed properties.

```css
a { color: red; }
/** ↑
 * This property */
```

This rule ignores preprocessor variables (e.g. `$sass`, `@less`).

This rule supports 1 message argument: the disallowed property.

## Options

### `Array<string>`

```json
["array", "of", "properties", "/regex/"]
```

Given:

```json
{
  "property-allowed-list": [
    "display",
    "/^(-webkit-)?animation/",
    "/^background/",
    "--foo"
  ]
}
```

The following patterns are considered problems:

```css
a { color: red; }
```

```css
a {
  animation: my-animation 2s;
  color: red;
}
```

```css
a { borkgrund: orange; }
```

```css
a { --bar: red; }
```

The following patterns are _not_ considered problems:

```css
a { display: block; }
```

```css
a { -webkit-animation: my-animation 2s; }
```

```css
a {
  animation: my-animation 2s;
  -webkit-animation: my-animation 2s;
  display: block;
}
```

```css
a { background: red; }
```

```css
a { background-color: red; }
```

```css
a { --foo: red; }
```
