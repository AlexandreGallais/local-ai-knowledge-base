---
title: "regexp/no-standalone-backslash"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-standalone-backslash.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-standalone-backslash

> disallow standalone backslashes (`\`)

## :book: Rule Details

This rule disallows backslash (`\`) without escape.

E.g. the regular expression `/\c/` without the unicode (`u`) flag is the same pattern as `/\\c/`.

In most cases, standalone backslashes are used by accident when a control escape sequence (`\cX`) or another escape sequence was intended. They are very confusing and should not be used intentionally.

This behavior is described in [Annex B] of the ECMAScript specification.

<eslint-code-block>

```js
/* eslint regexp/no-standalone-backslash: "error" */

/* ✓ GOOD */
var foo = /\cX/;

/* ✗ BAD */
var foo = /\c/;
var foo = /\c-/;
var foo = /[\c]/;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- regexp/no-useless-escape

## :books: Further reading

- ECMAScript® 2022 Language Specification > Annex B > B.1.4 Regular Expressions Patterns

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.10.0

## :mag: Implementation

- Rule source
- Test source
