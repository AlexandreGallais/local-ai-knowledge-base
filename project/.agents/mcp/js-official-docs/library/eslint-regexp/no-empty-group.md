---
title: "regexp/no-empty-group"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-empty-group.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-empty-group

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

> disallow empty group

## :book: Rule Details

This rule reports empty groups.

<eslint-code-block>

```js
/* eslint regexp/no-empty-group: "error" */

/* ✓ GOOD */
var foo = /(a)/;
var foo = /(?:a)/;

/* ✗ BAD */
// capturing group
var foo = /()/;
var foo = /(|)/;
// non-capturing group
var foo = /(?:)/;
var foo = /(?:|)/;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.1.0

## :mag: Implementation

- Rule source
- Test source
