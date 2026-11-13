---
title: "regexp/prefer-question-quantifier"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/prefer-question-quantifier.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/prefer-question-quantifier

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforce using `?` quantifier

## :book: Rule Details

This rule is aimed at using `?` quantifier instead of `{0,1}` in regular expressions.

<eslint-code-block fix>

```js
/* eslint regexp/prefer-question-quantifier: "error" */

/* ✓ GOOD */
var foo = /a?/;

/* ✗ BAD */
var foo = /a{0,1}/;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.1.0

## :mag: Implementation

- Rule source
- Test source
