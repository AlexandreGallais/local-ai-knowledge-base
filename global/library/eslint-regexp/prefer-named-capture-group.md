---
title: "regexp/prefer-named-capture-group"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/prefer-named-capture-group.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/prefer-named-capture-group

> enforce using named capture groups

## :book: Rule Details

This rule reports capturing groups without a name.

This rule is inspired by the [prefer-named-capture-group] rule. The positions of reports are improved over the core rule and arguments of `new RegExp()` are also checked.

<eslint-code-block>

```js
/* eslint regexp/prefer-named-capture-group: "error" */

/* ✓ GOOD */
var foo = /(?<foo>ba+r)/;
var foo = /\b(?:foo)+\b/;

/* ✗ BAD */
var foo = /\b(foo)+\b/;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [regexp/prefer-named-backreference]
- [regexp/prefer-named-replacement]
- [regexp/prefer-result-array-groups]

## :books: Further reading

- [prefer-named-capture-group]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v1.2.0

## :mag: Implementation

- Rule source
- Test source
