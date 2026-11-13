---
title: "regexp/negation"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/negation.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/negation

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforce use of escapes on negation

## :book: Rule Details

This rule enforces use of `\D`, `\W`, `\S` and `\P` on negation.

<eslint-code-block fix>

```js
/* eslint regexp/negation: "error" */

/* ✓ GOOD */
var foo = /\D/
var foo = /\W/
var foo = /\S/
var foo = /\P{ASCII}/u

var foo = /\d/
var foo = /\w/
var foo = /\s/
var foo = /\p{ASCII}/u

/* ✗ BAD */
var foo = /[^\d]/
var foo = /[^\w]/
var foo = /[^\s]/
var foo = /[^\p{ASCII}]/u

var foo = /[^\D]/
var foo = /[^\W]/
var foo = /[^\S]/
var foo = /[^\P{ASCII}]/u
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [regexp/simplify-set-operations]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.4.0

## :mag: Implementation

- Rule source
- Test source
