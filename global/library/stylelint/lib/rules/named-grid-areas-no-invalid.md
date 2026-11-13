---
title: "named-grid-areas-no-invalid"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/named-grid-areas-no-invalid/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# named-grid-areas-no-invalid

Disallow invalid named grid areas.

```css
a { grid-template-areas:
      "a a a"
      "b b b"; }
/**   ↑
 *  This named grid area */
```

For a named grid area to be valid, all strings must define:

- the same number of cell tokens
- at least one cell token

And all named grid areas that spans multiple grid cells must form a single filled-in rectangle.

This rule supports up to 1 message argument: the grid-area name.

## Options

### `true`

```json
{
  "named-grid-areas-no-invalid": true
}
```

The following patterns are considered problems:

```css
a { grid-template-areas: "" }
```

```css
a { grid-template-areas: "a a a"
                         "b b b b"; }
```

```css
a { grid-template-areas: "a a a"
                         "b b a"; }
```

The following pattern is _not_ considered a problem:

```css
a { grid-template-areas: "a a a"
                         "b b b"; }
```
