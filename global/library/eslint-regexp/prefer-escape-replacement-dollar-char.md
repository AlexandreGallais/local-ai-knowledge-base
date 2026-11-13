---
title: "regexp/prefer-escape-replacement-dollar-char"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/prefer-escape-replacement-dollar-char.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/prefer-escape-replacement-dollar-char

> enforces escape of replacement `$` character (`$$`).

## :book: Rule Details

This rule aims to enforce correct dollar sign escapes (`$$`) when using `$` in replacement pattern of string replacements.

<eslint-code-block>

```js
/* eslint regexp/prefer-escape-replacement-dollar-char: "error" */

/* ✓ GOOD */
'€1,234'.replace(/€/, '$$'); // "$1,234"

/* ✗ BAD */
'€1,234'.replace(/€/, '$'); // "$1,234"
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- regexp/no-useless-dollar-replacements

## :books: Further reading

- MDN Web Docs - String.prototype.replace() > Specifying a string as a parameter

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.6.0

## :mag: Implementation

- Rule source
- Test source
