---
title: "rule-nesting-at-rule-required-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/rule-nesting-at-rule-required-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# rule-nesting-at-rule-required-list

Require rules to be nested in specific at-rules.

```css
a { color: red; }
/** ↑
 * This rule */
```

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
