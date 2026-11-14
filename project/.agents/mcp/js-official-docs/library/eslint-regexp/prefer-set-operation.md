---
title: "regexp/prefer-set-operation"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/prefer-set-operation.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/prefer-set-operation

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> prefer character class set operations instead of lookarounds

## :book: Rule Details

Regular expressions with the `v` flag have access to character class set operations (e.g. `/[\s&&\p{ASCII}]/v`, `/[\w--\d]/v`). These are more readable and performant than using lookarounds to achieve the same effect. For example, `/(?!\d)\w/v` is the same as `/[\w--\d]/v`.

<eslint-code-block fix>

```js
/* eslint regexp/prefer-set-operation: "error" */

/* ✓ GOOD */
var foo = /(?!\d)\w/  // requires the v flag
var foo = /(?!\d)\w/u // requires the v flag

/* ✗ BAD */
var foo = /(?!\d)\w/v
var foo = /(?!\s)[\w\P{ASCII}]/v
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v2.0.0-next.9

## :mag: Implementation

- Rule source
- Test source
