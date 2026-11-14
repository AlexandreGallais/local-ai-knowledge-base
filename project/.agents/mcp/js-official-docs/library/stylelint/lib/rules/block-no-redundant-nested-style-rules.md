---
title: "block-no-redundant-nested-style-rules"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/block-no-redundant-nested-style-rules/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# block-no-redundant-nested-style-rules

Disallow redundant nested style rules within blocks.

```css
a { & { color: red; } }
/** ↑
 * This nested style rule */
```

Use this rule to enforce a convention. A `& {}` block is redundant, as its declarations can sit directly in the parent rule or nested at-rule.

This rule doesn't have any message arguments.

## Options

### `true`

```json
{
  "block-no-redundant-nested-style-rules": true
}
```

The following patterns are considered problems:

```css
a { & { color: red; } }
```

```css
a { @media all { & { color: red; } } }
```

The following patterns are _not_ considered problems:

```css
a { color: red; }
```

```css
a { @media all { color: red; } }
```

```css
a { &.foo { color: red; } }
```
