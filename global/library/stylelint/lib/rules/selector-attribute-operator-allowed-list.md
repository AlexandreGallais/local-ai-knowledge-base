---
title: "selector-attribute-operator-allowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-attribute-operator-allowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-attribute-operator-allowed-list

Specify a list of allowed attribute operators.

```css
[target="_blank"] {}
/**    ↑
 * This operator */
```

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
