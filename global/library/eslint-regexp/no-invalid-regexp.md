---
title: "regexp/no-invalid-regexp"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-invalid-regexp.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-invalid-regexp

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

> disallow invalid regular expression strings in `RegExp` constructors

## :book: Rule Details

This rule reports invalid regular expression patterns given to `RegExp` constructors.

<eslint-code-block>

```js
/* eslint regexp/no-invalid-regexp: "error" */

/* ✓ GOOD */
RegExp('foo')
RegExp('[a' + ']')

/* ✗ BAD */
RegExp('\\')
RegExp('[a-Z]*')
RegExp('\\p{Foo}', 'u')

const space = '\\s*'
RegExp('=' + space + '+(\\w+)', 'u')
```

</eslint-code-block>

### Differences to ESLint's `no-invalid-regexp` rule

This rule is almost functionally equivalent to ESLint's [no-invalid-regexp] rule. The only difference is that this rule doesn't validate flags (see no-non-standard-flag).

There are two reasons we provide this rule:

1. Better error reporting.

    Instead of reporting the whole invalid string, this rule will try to report the exact position of the syntax error.

2. Better support for complex constructor calls.

    ESLint's rule only validates `RegExp` constructors called with simple string literals. This rule also supports operations (e.g. string concatenation) and variables to some degree.

## :wrench: Options

Nothing.

## :books: Further reading

- [no-invalid-regexp]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v1.0.0

## :mag: Implementation

- Rule source
- Test source
