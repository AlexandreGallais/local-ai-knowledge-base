---
title: "regexp/sort-character-class-elements"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/sort-character-class-elements.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/sort-character-class-elements

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforces elements order in character class

## :book: Rule Details

This rule checks elements of character classes are sorted.

<eslint-code-block fix>

```js
/* eslint regexp/sort-character-class-elements: "error" */

/* ✓ GOOD */
var foo = /[abcdef]/
var foo = /[ab-f]/

/* ✗ BAD */
var foo = /[bcdefa]/
var foo = /[b-fa]/
```

</eslint-code-block>

## :wrench: Options

```json5
{
  "regexp/sort-character-class-elements": ["error", {
    "order": [
      "\\s", // \s or \S
      "\\w", // \w or \W
      "\\d", // \d or \D
      "\\p", // \p{...} or \P{...}
      "*", // Others (A character or range of characters or an element you did not specify.)
      "\\q", // \q{...}
      "[]", // Nesting character class, or character class expression
    ]
  }]
}
```

- `"order"` ... An array of your preferred order. The default is `["\\s", "\\w", "\\d", "\\p", "*", "\\q", "[]"]`.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.12.0

## :mag: Implementation

- Rule source
- Test source
