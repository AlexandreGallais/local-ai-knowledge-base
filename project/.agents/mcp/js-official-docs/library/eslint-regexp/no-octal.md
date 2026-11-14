---
title: "regexp/no-octal"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-octal.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-octal

💡 This rule is manually fixable by editor suggestions.

> disallow octal escape sequence

## :book: Rule Details

This rule reports octal escapes.

`\0` matches the `NUL` character. However, if `\0` is followed by another digit, it will become an octal escape sequence (e.g. `\07`).

Octal escapes can also easily be confused with backreferences. The same character sequence (e.g. `\3`) can either escape a character or be a backreference depending on the number of capturing groups in the pattern. E.g. the `\2` in `/(a)\2/` is a character but the `\2` in `/(a)(b)\2/` is a backreference. This can be a problem when refactoring regular expressions because an octal escape can become a backreference or vice versa.

<eslint-code-block>

```js
/* eslint regexp/no-octal: "error" */

/* ✓ GOOD */
var foo = /\0/;
var foo = /=/;
var foo = /(a)\1/;

/* ✗ BAD */
var foo = /\075/;
var foo = /\1/;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.1.0

## :mag: Implementation

- Rule source
- Test source
