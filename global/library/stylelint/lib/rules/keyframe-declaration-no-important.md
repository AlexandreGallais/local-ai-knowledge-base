---
title: "keyframe-declaration-no-important"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/keyframe-declaration-no-important/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# keyframe-declaration-no-important

Disallow invalid `!important` within keyframe declarations.

```css
@keyframes foo {
  from { opacity: 0 }
  to { opacity: 1 !important }
}              /* ↑ */
/**               ↑
*   This !important */
```

Using `!important` within keyframes declarations is completely ignored in some browsers.

This rule doesn't have any message arguments.

## Options

### `true`

```json
{
  "keyframe-declaration-no-important": true
}
```

The following pattern is considered a problem:

```css
@keyframes foo {
  from {
    opacity: 0;
  }
  to {
    opacity: 1 !important;
  }
}
```

The following patterns are _not_ considered problems:

```css
@keyframes foo {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

```css
a { color: pink !important; }
```
