---
title: "selector-combinator-disallowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-combinator-disallowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-combinator-disallowed-list

Specify a list of disallowed combinators.

```css
  a + b {}
/** ↑
 * This combinator */
```

This rule normalizes the whitespace descendant combinator to be a single space.

This rule ignores reference combinators e.g. `/for/`.

This rule supports 1 message argument: the disallowed combinator.

## Options

### `Array<string>`

```json
["array", "of", "combinators"]
```

Given:

```json
{
  "selector-combinator-disallowed-list": [">", " "]
}
```

The following patterns are considered problems:

```css
a > b {}
```

```css
a b {}
```

```css
a
b {}
```

The following patterns are _not_ considered problems:

```css
a + b {}
```

```css
a ~ b {}
```
