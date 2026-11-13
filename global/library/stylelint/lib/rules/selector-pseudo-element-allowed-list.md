---
title: "selector-pseudo-element-allowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-pseudo-element-allowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-pseudo-element-allowed-list

Specify a list of allowed pseudo-element selectors.

```css
  a::before {}
/**  ↑
 * This pseudo-element selector */
```

This rule ignores:

- CSS2 pseudo-elements i.e. those prefixed with a single colon
- selectors that use variable interpolation e.g. `::#{$variable} {}`

This rule supports 1 message argument: the disallowed pseudo-element.

## Options

### `Array<string>`

```json
["array", "of", "pseudo-elements", "/regex/"]
```

Given:

```json
{
  "selector-pseudo-element-allowed-list": ["before", "/^--my-/i"]
}
```

The following patterns are considered problems:

```css
a::after {}
```

```css
a::--not-my-pseudo-element {}
```

The following patterns are _not_ considered problems:

```css
a::before {}
```

```css
a::--my-pseudo-element {}
```

```css
a::--MY-OTHER-pseudo-element {}
```
