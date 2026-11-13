---
title: "selector-attribute-name-disallowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-attribute-name-disallowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-attribute-name-disallowed-list

Specify a list of disallowed attribute names.

```css
    [class~="foo"] {}
/**  ↑
 * This name */
```

This rule supports 1 message argument: the disallowed attribute name.

## Options

### `Array<string>`

```json
["array", "of", "attribute-names", "/regex/"]
```

Given:

```json
{
  "selector-attribute-name-disallowed-list": ["class", "id", "/^data-/"]
}
```

The following patterns are considered problems:

```css
[class*="foo"] {}
```

```css
[id~="bar"] {}
```

```css
[data-foo*="bar"] {}
```

The following patterns are _not_ considered problems:

```css
[lang~="en-us"] {}
```

```css
[target="_blank"] {}
```

```css
[href$=".bar"] {}
```
