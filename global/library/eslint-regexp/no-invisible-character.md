---
title: "regexp/no-invisible-character"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-invisible-character.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-invisible-character

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> disallow invisible raw character

## :book: Rule Details

This rule disallows using invisible characters other than SPACE (`U+0020`) without using escapes.

<eslint-code-block fix>

```js
/* eslint regexp/no-invisible-character: "error" */

/* ✓ GOOD */
var foo = /\t/;
var foo = /\v/;
var foo = /\f/;
var foo = /\u3000/;
var foo = / /; // SPACE (`U+0020`)

/* ✗ BAD */
var foo = /	/;
var foo = //;
var foo = //;
var foo = /　/;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.1.0

## :mag: Implementation

- Rule source
- Test source
