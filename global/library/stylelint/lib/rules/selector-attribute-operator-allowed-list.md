---
title: "selector-attribute-operator-allowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-attribute-operator-allowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-attribute-operator-allowed-list

Specify a list of allowed attribute operators.

```css
[target="_blank"] {}
/**    ↑
 * This operator */
```

Use this rule to enforce a subset of attribute operators as a convention. For example, allow only `=`, `~=` and `|=` to match whole values.

This rule supports 1 message argument: the disallowed attribute operator.

## Options

### `Array<string>`

```json
["array", "of", "attribute-operators"]
```

Given:

```json
{
  "selector-attribute-operator-allowed-list": ["=", "|="]
}
```

The following patterns are considered problems:

```css
[class*="test"] {}
```

```css
[title~="flower"] {}
```

```css
[class^="top"] {}
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
