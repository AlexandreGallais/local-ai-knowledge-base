---
title: "regexp/no-trivially-nested-quantifier"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-trivially-nested-quantifier.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-trivially-nested-quantifier

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> disallow nested quantifiers that can be rewritten as one quantifier

## :book: Rule Details

In some cases, nested quantifiers can be rewritten as one quantifier (e.g. `(?:a{1,2}){3}` -> `a{3,6}`).

<eslint-code-block fix>

```js
/* eslint regexp/no-trivially-nested-quantifier: "error" */

/* ✓ GOOD */
var foo = /(a{1,2})+/;  // the rule won't touch capturing groups
var foo = /(?:a{2})+/;

/* ✗ BAD */
var foo = /(?:a{1,2})+/;
var foo = /(?:a{1,2}){3,4}/;
var foo = /(?:a{4,}){5}/;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.9.0

## :mag: Implementation

- Rule source
- Test source
