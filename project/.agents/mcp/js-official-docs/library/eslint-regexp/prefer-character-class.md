---
title: "regexp/prefer-character-class"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/prefer-character-class.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/prefer-character-class

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforce using character class

## :book: Rule Details

Instead of single-character alternatives (e.g. `(?:a|b|c)`), character classes (e.g. `[abc]`) should be preferred.

The main reason for doing this is performance. Character classes don't require backtracking and are heavily optimized by the regex engine. On the other hand, alternatives are usually quite tricky to optimize.

Character classes are also safer than alternatives because they don't require backtracking. While `^(?:\w|a)+b$` will take _O(2^n)_ time to reject a string of _n_ many `a`s, the regex `^[\wa]+b$` will reject a string of _n_ many `a`s in _O(n)_.

### Limitations

This rule might not be able to merge all single-character alternatives.

<eslint-code-block fix>

```js
/* eslint regexp/prefer-character-class: "error" */

/* ✓ GOOD */
var foo = /[abc]/
var foo = /(?:a|b)/

/* ✗ BAD */
var foo = /a|b|c/
var foo = /(a|b|c)c/
var foo = /.|\s/
var foo = /(\w|\d)+:/
```

</eslint-code-block>

## :wrench: Options

```json5
{
  "regexp/prefer-character-class": [
    "error",
    {
        "minAlternatives": 3
    }
  ]
}
```

### `minAlternatives: integer`

This number controls how many character alternatives have to be present for them to be merged. By default, there need to be at least 3 alternatives.

Note that this option does not affect character alternatives where the characters overlap. These alternatives will always be merged to prevent excessive backtracking.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.4.0

## :mag: Implementation

- Rule source
- Test source
