---
title: "regexp/no-useless-set-operand"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-useless-set-operand.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-useless-set-operand

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> disallow unnecessary elements in expression character classes

## :book: Rule Details

The `v` flag added set operations for character classes, e.g. `[\w&&\D]` and `[\w--\d]`, but there are no limitations on what operands can be used. This rule reports any unnecessary operands.

<eslint-code-block fix>

```js
/* eslint regexp/no-useless-set-operand: "error" */

/* ✓ GOOD */
foo = /[\w--\d]/v
foo = /[\w--[\d_]]/v

/* ✗ BAD */
foo = /[\w--[\d$]]/v
foo = /[\w&&\d]/v
foo = /[\w&&\s]/v
foo = /[\w&&[\d\s]]/v
foo = /[\w&&[^\d\s]]/v
foo = /[\w--\s]/v
foo = /[\d--\w]/v
foo = /[\w--[\d\s]]/v
foo = /[\w--[^\d\s]]/v

```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v2.0.0-next.10

## :mag: Implementation

- Rule source
- Test source
