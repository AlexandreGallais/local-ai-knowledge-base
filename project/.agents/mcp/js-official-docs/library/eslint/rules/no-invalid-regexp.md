---
title: "no-invalid-regexp"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-invalid-regexp.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-invalid-regexp

An invalid pattern in a regular expression literal is a `SyntaxError` when the code is parsed, but an invalid string in `RegExp` constructors throws a `SyntaxError` only when the code is executed.

## Rule Details

This rule disallows invalid regular expression strings in `RegExp` constructors.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-invalid-regexp: "error"*/

RegExp('[')

RegExp('.', 'z')

new RegExp('\\')
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-invalid-regexp: "error"*/

RegExp('.')

new RegExp

this.RegExp('[')
```

Please note that this rule validates regular expressions per the latest ECMAScript specification, regardless of your parser settings.

If you want to allow additional constructor flags for any reason, you can specify them using the `allowConstructorFlags` option. These flags will then be ignored by the rule.

## Options

This rule has an object option for exceptions:

* `"allowConstructorFlags"` is a case-sensitive array of flags

### allowConstructorFlags

Examples of **correct** code for this rule with the `{ "allowConstructorFlags": ["a", "z"] }` option:

**Correct:**

```js
/*eslint no-invalid-regexp: ["error", { "allowConstructorFlags": ["a", "z"] }]*/

new RegExp('.', 'a')

new RegExp('.', 'az')
```
