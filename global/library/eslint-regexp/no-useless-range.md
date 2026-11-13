---
title: "regexp/no-useless-range"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-useless-range.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-useless-range

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> disallow unnecessary character ranges

## :book: Rule Details

This rule reports unnecessary character ranges. E.g. `[a-a]`

<eslint-code-block fix>

```js
/* eslint regexp/no-useless-range: "error" */

/* ✓ GOOD */
var foo = /[a]/
var foo = /[ab]/

/* ✗ BAD */
var foo = /[a-a]/
var foo = /[a-b]/
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.3.0

## :mag: Implementation

- Rule source
- Test source
