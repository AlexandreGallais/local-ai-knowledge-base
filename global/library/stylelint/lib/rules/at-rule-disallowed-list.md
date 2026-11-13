---
title: "at-rule-disallowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/at-rule-disallowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# at-rule-disallowed-list

Specify a list of disallowed at-rules.

```css
    @keyframes name {}
/** ↑
 * At-rules like this */
```

This rule ignores the `@charset` rule.

This rule supports 1 message argument: the disallowed at-rule.

## Options

### `Array<string>`

```json
["array", "of", "at-rules", "/regex/"]
```

Given:

```json
{
  "at-rule-disallowed-list": ["extend", "/^(-webkit-|-moz-)?keyframes$/i"]
}
```

The following patterns are considered problems:

```css
a { @extend placeholder; }
```

```css
@keyframes name {
  from { top: 10px; }
  to { top: 20px; }
}
```

```css
@-moz-keyframes name {
  from { top: 10px; }
  to { top: 20px; }
}
```

The following patterns are _not_ considered problems:

```css
@import "path/to/file.css";
```
