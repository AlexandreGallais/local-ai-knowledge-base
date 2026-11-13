---
title: "regexp/no-empty-string-literal"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-empty-string-literal.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-empty-string-literal

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

> disallow empty string literals in character classes

## :book: Rule Details

This rule reports empty string literals in character classes.

If the empty string literal is supposed to match the empty string, then use a
quantifier instead. For example, `[ab\q{}]` should be written as `[ab]?`.

This rule does not report empty alternatives in string literals. (e.g. `/[\q{a|}]/v`)\
If you want to report empty alternatives in string literals, use the [regexp/no-empty-alternative] rule.

<eslint-code-block>

```js
/* eslint regexp/no-empty-string-literal: "error" */

/* ✓ GOOD */
var foo = /[\q{a}]/v;
var foo = /[\q{abc}]/v;
var foo = /[\q{a|}]/v;

/* ✗ BAD */
var foo = /[\q{}]/v;
var foo = /[\q{|}]/v;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [regexp/no-empty-alternative]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v2.0.0-next.11

## :mag: Implementation

- Rule source
- Test source
