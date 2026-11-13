---
title: "regexp/no-zero-quantifier"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-zero-quantifier.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-zero-quantifier

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

💡 This rule is manually fixable by editor suggestions.

> disallow quantifiers with a maximum of zero

## :book: Rule Details

This rule reports quantifiers with a maximum of zero. These quantifiers trivially do not affect the pattern is any way and can be removed.

<eslint-code-block>

```js
/* eslint regexp/no-zero-quantifier: "error" */

/* ✓ GOOD */
var foo = /a?/;
var foo = /a{0,}/;
var foo = /a{0,1}/;

/* ✗ BAD */
var foo = /a{0}/;
var foo = /a{0,0}?/;
var foo = /(a){0}/;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.10.0

## :mag: Implementation

- Rule source
- Test source
