---
title: "rule-nesting-at-rule-required-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/rule-nesting-at-rule-required-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# rule-nesting-at-rule-required-list

Require rules to be nested in specific at-rules.

```css
a { color: red; }
/** ↑
 * This rule */
```

Use this rule to enforce a convention. For example, require every rule to be inside a `layer` at-rule, as unlayered normal declarations always beat layered ones.

This rule supports 1 message argument per configured at-rule pattern.

## Options

### `Array<string | RegExp>`

Given:

```json
{
  "rule-nesting-at-rule-required-list": ["layer", "/^--foo-/"]
}
```

The following patterns are considered problems:

```css
a { color: red; }
```

```css
@media all {
  a { color: red; }
}
```

```css
a {
  @layer {
    color: red;
  }
}
```

The following patterns are _not_ considered problems:

```css
@layer {
  a { color: red; }
}
```

```css
@--foo-bar {
  a { color: red; }
}
```

```css
@--foo-baz {
  a { color: red; }
}
```

```css
@font-face {
  font-family: "foo";
}
```
