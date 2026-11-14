---
title: "property-disallowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/property-disallowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# property-disallowed-list

Specify a list of disallowed properties.

```css
a { text-rendering: optimizeLegibility; }
/** ↑
 * This property */
```

Use this rule to enforce a convention. For example, disallow:

- `animation` if you use an animation library
- `float` in favor of flex and grid

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
