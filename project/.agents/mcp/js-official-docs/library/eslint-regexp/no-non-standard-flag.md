---
title: "regexp/no-non-standard-flag"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-non-standard-flag.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-non-standard-flag

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

> disallow non-standard flags

## :book: Rule Details

This rule reports non-standard flags.

Some JavaScript runtime implementations allow special flags not defined in the ECMAScript standard. These flags are experimental and should not be used in production code.

<eslint-code-block>

```js
/* eslint regexp/no-non-standard-flag: "error" */

/* ✓ GOOD */
var foo = /a*b*c/guy;

/* ✗ BAD */
var foo = RegExp("(?:a|a)*b", "l");
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.9.0

## :mag: Implementation

- Rule source
- Test source
