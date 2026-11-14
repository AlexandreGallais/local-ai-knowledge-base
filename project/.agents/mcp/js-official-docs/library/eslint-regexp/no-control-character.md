---
title: "regexp/no-control-character"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-control-character.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-control-character

💡 This rule is manually fixable by editor suggestions.

> disallow control characters

## :book: Rule Details

This rule reports control characters.

This rule is inspired by the [no-control-regex] rule. The positions of reports are improved over the core rule and suggestions are provided in some cases.

<eslint-code-block>

```js
/* eslint regexp/no-control-character: "error" */

/* ✓ GOOD */
var foo = /\n/;
var foo = RegExp("\n");

/* ✗ BAD */
var foo = /\x1f/;
var foo = /\x0a/;
var foo = RegExp('\x0a');
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :books: Further reading

- [no-control-regex]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v1.2.0

## :mag: Implementation

- Rule source
- Test source
