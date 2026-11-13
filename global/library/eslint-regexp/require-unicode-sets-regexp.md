---
title: "regexp/require-unicode-sets-regexp"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/require-unicode-sets-regexp.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/require-unicode-sets-regexp

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforce the use of the `v` flag

## :book: Rule Details

This rule reports regular expressions without the `v` flag.

It will automatically replace the `v` flag to regular expressions where it is already uses the 'u' flag and statically guaranteed to be safe to do so. In all other cases, the developer has to check that adding the `v` flag doesn't cause the regex to behave incorrectly.

If you want to automatically add the `v` flag to legacy regular expressions that don't use the `u` flag, use them together with the [regexp/require-unicode-regexp] rule.

<eslint-code-block fix>

```js
/* eslint regexp/require-unicode-sets-regexp: "error" */

/* ✓ GOOD */
var foo = /foo/v;
var foo = /a\s+b/v;

/* ✗ BAD */
var foo = /foo/;
var foo = RegExp("a\\s+b");
var foo = /[a-z]/i;
var foo = /\S/;
var foo = /foo/u;
var foo = RegExp("a\\s+b", 'u');
var foo = /[a-z]/iu;
var foo = /\S/u;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [regexp/require-unicode-regexp]

## :books: Further reading

- [require-unicode-regexp]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v2.0.0-next.7

## :mag: Implementation

- Rule source
- Test source
