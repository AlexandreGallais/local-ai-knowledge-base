---
title: "regexp/prefer-regexp-test"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/prefer-regexp-test.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/prefer-regexp-test

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforce that `RegExp#test` is used instead of `String#match` and `RegExp#exec`

## :book: Rule Details

This rule is aimed to use `RegExp#test` to check if a pattern matches a string.

This rule inspired by unicorn/prefer-regexp-test rule.

<eslint-code-block fix>

```js
/* eslint regexp/prefer-regexp-test: "error" */

const text = 'something';
const pattern = /thing/;

/* ✓ GOOD */
if (pattern.test(text)) {}

/* ✗ BAD */
if (pattern.exec(text)) {}
if (text.match(pattern)) {}
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :books: Further reading

- unicorn/prefer-regexp-test

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.3.0

## :mag: Implementation

- Rule source
- Test source
