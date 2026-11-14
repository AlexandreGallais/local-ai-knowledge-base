---
title: "at-rule-disallowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/at-rule-disallowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# at-rule-disallowed-list

Specify a list of disallowed at-rules.

```css
    @keyframes name {}
/** ↑
 * At-rules like this */
```

Use this rule to enforce a convention. For example, disallow:

- `import` if you use a bundler
- `keyframes` if you use an animation library

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
