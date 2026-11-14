---
title: "regexp/no-useless-string-literal"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-useless-string-literal.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-useless-string-literal

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> disallow string disjunction of single characters in `\q{...}`

## :book: Rule Details

This rule reports the string alternatives of a single character in `\q{...}`.
It can be placed outside `\q{...}`.

<eslint-code-block fix>

```js
/* eslint regexp/no-useless-string-literal: "error" */

/* ✓ GOOD */
var foo = /[\q{abc}]/v
var foo = /[\q{ab|}]/v

/* ✗ BAD */
var foo = /[\q{a}]/v // => /[a]/v
var foo = /[\q{a|bc}]/v // => /[a\q{bc}]/v
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [regexp/no-empty-alternative]
- [regexp/no-empty-string-literal]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v2.0.0-next.12

## :mag: Implementation

- Rule source
- Test source
