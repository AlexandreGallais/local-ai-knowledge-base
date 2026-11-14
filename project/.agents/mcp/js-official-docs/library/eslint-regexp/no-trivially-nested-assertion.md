---
title: "regexp/no-trivially-nested-assertion"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-trivially-nested-assertion.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-trivially-nested-assertion

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> disallow trivially nested assertions

## :book: Rule Details

Lookaround assertions that only contain another assertion can be simplified.

<eslint-code-block fix>

```js
/* eslint regexp/no-trivially-nested-assertion: "error" */

/* ✓ GOOD */
var foo = /a(?=b)/;
var foo = /a(?!$)/;

/* ✗ BAD */
var foo = /a(?=$)/;
var foo = /a(?=(?!a))/;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.9.0

## :mag: Implementation

- Rule source
- Test source
