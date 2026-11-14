---
title: "regexp/require-unicode-regexp"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/require-unicode-regexp.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/require-unicode-regexp

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforce the use of the `u` flag

## :book: Rule Details

This rule reports regular expressions without the `u` flag.

It will automatically add the `u` flag to regular expressions where it is statically guaranteed to be safe to do so. In all other cases, the developer has to check that adding the `u` flag doesn't cause the regex to behave incorrectly.

This rule is inspired by the [require-unicode-regexp] rule. The position of the report is improved over the core rule and arguments of `new RegExp()` are also checked.

<eslint-code-block fix>

```js
/* eslint regexp/require-unicode-regexp: "error" */

/* ✓ GOOD */
var foo = /foo/u;
var foo = /a\s+b/u;

/* ✗ BAD */
var foo = /foo/;
var foo = RegExp("a\\s+b");
var foo = /[a-z]/i;
var foo = /\S/;
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :books: Further reading

- [require-unicode-regexp]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v1.2.0

## :mag: Implementation

- Rule source
- Test source
