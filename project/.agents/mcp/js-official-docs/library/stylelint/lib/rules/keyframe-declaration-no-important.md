---
title: "keyframe-declaration-no-important"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/keyframe-declaration-no-important/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
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

Use this rule to avoid `!important` that has no effect. Some browsers ignore the entire declaration when it contains `!important`.

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
