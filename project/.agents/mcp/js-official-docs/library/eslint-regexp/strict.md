---
title: "regexp/strict"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/strict.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/strict

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

> disallow not strictly valid regular expressions

## :book: Rule Details

This rule disallows not strictly valid regular expressions.

An invalid pattern in a regular expression literal is a `SyntaxError` when the code is parsed. However, it is not always strictly checked.

Depending on the syntax defined in [Annex B] of the ECMAScript specification, some ambiguous pattern syntax may also succeed in parsing as a valid pattern. This rule reports these ambiguous patterns.

<eslint-code-block fix>

```js
/* eslint regexp/strict: "error" */

/* ✓ GOOD */
var foo = /\}/
var foo = /\{/
var foo = /\]/
var foo = /\u{42}/u; // It matches "B".
var foo = /u{42}/; // It matches a string followed by 42 "u"s.

/* ✗ BAD */
var foo = /}/
var foo = /{/
var foo = /]/
var foo = /\u{42}/; // It matches a string followed by 42 "u"s.
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :books: Further reading

- ECMAScript® 2022 Language Specification > Annex B > B.1.4 Regular Expressions Patterns

## :couple: Related rules

- [no-invalid-regexp]
- [regexp/no-standalone-backslash]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.12.0

## :mag: Implementation

- Rule source
- Test source
