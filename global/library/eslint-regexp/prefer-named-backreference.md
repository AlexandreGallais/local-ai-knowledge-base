---
title: "regexp/prefer-named-backreference"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/prefer-named-backreference.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/prefer-named-backreference

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforce using named backreferences

## :book: Rule Details

This rule reports and fixes backreferences that do not use the name of their referenced capturing group.

<eslint-code-block fix>

```js
/* eslint regexp/prefer-named-backreference: "error" */

/* ✓ GOOD */
var foo = /(a)\1/
var foo = /(?<foo>a)\k<foo>/

/* ✗ BAD */
var foo = /(?<foo>a)\1/
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [regexp/prefer-named-capture-group]
- [regexp/prefer-named-replacement]
- [regexp/prefer-result-array-groups]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.9.0

## :mag: Implementation

- Rule source
- Test source
