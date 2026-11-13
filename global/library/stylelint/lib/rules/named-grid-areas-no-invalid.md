---
title: "named-grid-areas-no-invalid"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/named-grid-areas-no-invalid/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
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

Use this rule to avoid grids with no named areas. An invalid `grid-template-areas` value invalidates the whole declaration.

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
