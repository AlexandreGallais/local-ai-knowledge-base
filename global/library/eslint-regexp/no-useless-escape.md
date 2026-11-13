---
title: "regexp/no-useless-escape"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-useless-escape.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-useless-escape

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> disallow unnecessary escape characters in RegExp

## :book: Rule Details

This rule reports unnecessary escape characters in RegExp.\
You may be able to find another mistake by finding unnecessary escapes.

<eslint-code-block fix>

```js
/* eslint regexp/no-useless-escape: "error" */

/* ✓ GOOD */
var foo = /\[/
var foo = /\\/

/* ✗ BAD */
var foo = /\a/
var foo = /\x7/
var foo = /\u41/
var foo = /\u{[41]}/
```

</eslint-code-block>

This rule checks for unnecessary escapes with deeper regular expression parsing than the ESLint core's [no-useless-escape] rule.

<eslint-code-block fix>

```js
/* eslint no-useless-escape: "error" */

// no-useless-escape rule also reports it.
var foo = /\a/

// no-useless-escape rule DOES NOT report it.
var foo = /\x7/
var foo = /\u41/
var foo = /\u{[41]}/
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [regexp/no-standalone-backslash]
- [no-useless-escape]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.4.0

## :mag: Implementation

- Rule source
- Test source
