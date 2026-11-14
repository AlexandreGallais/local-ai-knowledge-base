---
title: "regexp/use-ignore-case"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/use-ignore-case.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/use-ignore-case

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> use the `i` flag if it simplifies the pattern

## :book: Rule Details

This rule reports regular expressions that can be simplified by adding the `i` flag.

<eslint-code-block fix>

```js
/* eslint regexp/use-ignore-case: "error" */

/* ✓ GOOD */
var foo = /\w\d+a/;
var foo = /\b0x[a-fA-F0-9]+\b/;

/* ✗ BAD */
var foo = /[a-zA-Z]/;
var foo = /\b0[xX][a-fA-F0-9]+\b/;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v1.4.0

## :mag: Implementation

- Rule source
- Test source
