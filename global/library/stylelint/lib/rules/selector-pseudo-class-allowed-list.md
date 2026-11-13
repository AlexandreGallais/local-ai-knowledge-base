---
title: "selector-pseudo-class-allowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-pseudo-class-allowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-pseudo-class-allowed-list

Specify a list of allowed pseudo-class selectors.

```css
  a:hover {}
/** ↑
 * This pseudo-class selector */
```

This rule ignores selectors that use variable interpolation e.g. `:#{$variable} {}`.

This rule supports 1 message argument: the disallowed pseudo-class.

## Options

### `Array<string>`

```json
["array", "of", "pseudo-classes", "/regex/"]
```

Given:

```json
{
  "selector-pseudo-class-allowed-list": ["hover", "/^nth-/"]
}
```

The following patterns are considered problems:

```css
a:focus {}
```

```css
a:first-of-type {}
```

The following patterns are _not_ considered problems:

```css
a:hover {}
```

```css
a:nth-of-type(5) {}
```

```css
a:nth-child(2) {}
```
