---
title: "property-disallowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/property-disallowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# property-disallowed-list

Specify a list of disallowed properties.

```css
a { text-rendering: optimizeLegibility; }
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
  "property-disallowed-list": [
    "text-rendering",
    "/^(-webkit-)?animation/",
    "/^background/",
    "--foo"
  ]
}
```

The following patterns are considered problems:

```css
a { text-rendering: optimizeLegibility; }
```

```css
a {
  animation: my-animation 2s;
}
```

```css
a {
  --foo: red;
}
```

```css
a { -webkit-animation: my-animation 2s; }
```

```css
a { background: red; }
```

```css
a { background-size: cover; }
```

The following patterns are _not_ considered problems:

```css
a { color: red; }
```

```css
a { no-background: sure; }
```

```css
a {
  --bar: red;
}
```
