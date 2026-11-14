---
title: "regexp/prefer-unicode-codepoint-escapes"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/prefer-unicode-codepoint-escapes.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/prefer-unicode-codepoint-escapes

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforce use of unicode codepoint escapes

## :book: Rule Details

This rule enforces the use of Unicode codepoint escapes instead of Unicode escapes using surrogate pairs.

If you want to enforce characters that do not use surrogate pairs into unicode escapes or unicode code point escapes, use the [regexp/unicode-escape] rule.

<eslint-code-block fix>

```js
/* eslint regexp/prefer-unicode-codepoint-escapes: "error" */

/* ✓ GOOD */
var foo = /\u{1f600}/u
var foo = /😀/u

/* ✗ BAD */
var foo = /\ud83d\ude00/u
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [regexp/unicode-escape]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.3.0

## :mag: Implementation

- Rule source
- Test source
