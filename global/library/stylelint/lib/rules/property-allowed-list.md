---
title: "property-allowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/property-allowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# property-allowed-list

Specify a list of allowed properties.

```css
a { color: red; }
/** ↑
 * This property */
```

Use this rule to enforce a subset of properties as a convention. For example, via `overrides`, allow only:

- `/^--/` in a tokens file
- `/^(margin|padding|font)/` in a reset

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
