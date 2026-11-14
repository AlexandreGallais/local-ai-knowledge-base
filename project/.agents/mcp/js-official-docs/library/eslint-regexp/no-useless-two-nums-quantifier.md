---
title: "regexp/no-useless-two-nums-quantifier"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-useless-two-nums-quantifier.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-useless-two-nums-quantifier

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> disallow unnecessary `{n,m}` quantifier

## :book: Rule Details

This rule reports unnecessary `{n,m}` quantifiers.

<eslint-code-block fix>

```js
/* eslint regexp/no-useless-two-nums-quantifier: "error" */

/* ✓ GOOD */
var foo = /a{0,1}/;
var foo = /a{1,5}/;
var foo = /a{1,}/;
var foo = /a{2}/;

/* ✗ BAD */
var foo = /a{0,0}/;
var foo = /a{1,1}/;
var foo = /a{2,2}/;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.1.0

## :mag: Implementation

- Rule source
- Test source
