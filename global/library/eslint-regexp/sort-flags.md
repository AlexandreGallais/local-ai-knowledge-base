---
title: "regexp/sort-flags"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/sort-flags.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/sort-flags

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> require regex flags to be sorted

## :book: Rule Details

The flags of JavaScript regular expressions should be sorted alphabetically
because the flags of the `.flags` property of `RegExp` objects are always
sorted. Not sorting flags in regex literals misleads readers into thinking that
the order may have some purpose which it doesn't.

<eslint-code-block fix>

```js
/* eslint regexp/sort-flags: "error" */

/* ✓ GOOD */
var foo = /abc/
var foo = /abc/iu
var foo = /abc/gimsuy

/* ✗ BAD */
var foo = /abc/mi
var foo = /abc/us
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :heart: Compatibility

This rule was taken from [eslint-plugin-clean-regex].\
This rule is compatible with [clean-regex/sort-flags] rule.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.9.0

## :mag: Implementation

- Rule source
- Test source
