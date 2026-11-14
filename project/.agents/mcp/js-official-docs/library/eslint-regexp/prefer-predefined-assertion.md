---
title: "regexp/prefer-predefined-assertion"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/prefer-predefined-assertion.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/prefer-predefined-assertion

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> prefer predefined assertion over equivalent lookarounds

## :book: Rule Details

All predefined assertions (`\b`, `\B`, `^`, and `$`) can be expressed as lookaheads and lookbehinds. E.g. `/a$/` is the same as `/a(?![^])/`.

In most cases, it's better to use the predefined assertions because they are better known.

<eslint-code-block fix>

```js
/* eslint regexp/prefer-predefined-assertion: "error" */

/* ✓ GOOD */
var foo = /a(?=\W)/;

/* ✗ BAD */
var foo = /a(?![^])/;
var foo = /a(?!\w)/;
var foo = /a+(?!\w)(?:\s|bc+)+/;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.10.0

## :mag: Implementation

- Rule source
- Test source
