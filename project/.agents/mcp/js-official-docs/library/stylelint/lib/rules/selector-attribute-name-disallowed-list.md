---
title: "selector-attribute-name-disallowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-attribute-name-disallowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-attribute-name-disallowed-list

Specify a list of disallowed attribute names.

```css
    [class~="foo"] {}
/**  ↑
 * This name */
```

Use this rule to enforce a convention. For example, disallow:

- `class` and `id`, so that `.foo` and `#foo` are used instead
- `/^data-(js|test)/` if your tests own those attributes

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
