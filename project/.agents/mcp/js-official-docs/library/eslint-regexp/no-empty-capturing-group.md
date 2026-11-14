---
title: "regexp/no-empty-capturing-group"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-empty-capturing-group.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-empty-capturing-group

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

> disallow capturing group that captures empty.

## :book: Rule Details

This rule reports capturing group that captures assertions.

<eslint-code-block>

```js
/* eslint regexp/no-empty-capturing-group: "error" */

/* ✓ GOOD */
var foo = /(a)/;
var foo = /a(?:\b)/;
var foo = /a(?:$)/;
var foo = /(?:^)a/;
var foo = /(?:^|b)a/;

/* ✗ BAD */
var foo = /a(\b)/;
var foo = /a($)/;
var foo = /(^)a/;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.12.0

## :mag: Implementation

- Rule source
- Test source
