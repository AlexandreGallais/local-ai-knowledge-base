---
title: "regexp/no-escape-backspace"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-escape-backspace.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-escape-backspace

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

💡 This rule is manually fixable by editor suggestions.

> disallow escape backspace (`[\b]`)

## :book: Rule Details

This rule reports `[\b]`.\
The word boundaries (`\b`) and the escape backspace (`[\b]`) are indistinguishable at a glance. This rule does not allow backspace (`[\b]`). Use unicode escapes (`\u0008`) instead.

<eslint-code-block>

```js
/* eslint regexp/no-escape-backspace: "error" */

/* ✓ GOOD */
var foo = /\b/;
var foo = /\u0008/;
var foo = /\cH/;
var foo = /\x08/;

/* ✗ BAD */
var foo = /[\b]/;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.1.0

## :mag: Implementation

- Rule source
- Test source
