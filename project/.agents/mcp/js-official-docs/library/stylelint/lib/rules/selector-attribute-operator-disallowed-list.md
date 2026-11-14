---
title: "selector-attribute-operator-disallowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-attribute-operator-disallowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-attribute-operator-disallowed-list

Specify a list of disallowed attribute operators.

```css
[target="_blank"] {}
/**    ↑
 * This operator */
```

Use this rule to enforce a convention. For example, disallow `*=`, which matches any substring.

This rule supports 1 message argument: the disallowed attribute operator.

## Options

### `Array<string>`

```json
["array", "of", "attribute-operators"]
```

Given:

```json
{
  "selector-attribute-operator-disallowed-list": ["*="]
}
```

The following patterns are considered problems:

```css
[class*="test"] {}
```

The following patterns are _not_ considered problems:

```css
[target] {}
```

```css
[target="_blank"] {}
```

```css
[class|="top"] {}
```
