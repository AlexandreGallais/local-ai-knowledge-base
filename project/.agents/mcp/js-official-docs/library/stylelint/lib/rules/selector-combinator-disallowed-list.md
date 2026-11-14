---
title: "selector-combinator-disallowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-combinator-disallowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-combinator-disallowed-list

Specify a list of disallowed combinators.

```css
  a + b {}
/** ↑
 * This combinator */
```

Use this rule to enforce a convention. For example, disallow:

- `" "` in favor of `>`, so that styles can't reach deep into the markup
- `+` and `~` to avoid rules that depend on the order of elements

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
