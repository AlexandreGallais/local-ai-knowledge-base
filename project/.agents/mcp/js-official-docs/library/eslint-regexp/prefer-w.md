---
title: "regexp/prefer-w"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/prefer-w.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/prefer-w

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforce using `\w`

## :book: Rule Details

This rule is aimed at using `\w` in regular expressions.

<eslint-code-block fix>

```js
/* eslint regexp/prefer-w: "error" */

/* ✓ GOOD */
var foo = /\w/;
var foo = /\W/;

/* ✗ BAD */
var foo = /[0-9a-zA-Z_]/;
var foo = /[^0-9a-zA-Z_]/;
var foo = /[0-9a-z_]/i;
var foo = /[0-9a-z_-]/i;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.1.0

## :mag: Implementation

- Rule source
- Test source
