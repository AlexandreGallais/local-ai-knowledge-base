---
title: "no-nonoctal-decimal-escape"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-nonoctal-decimal-escape.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-nonoctal-decimal-escape

Although not being specified in the language until ECMAScript 2021, `\8` and `\9` escape sequences in string literals were allowed in most JavaScript engines, and treated as "useless" escapes:

```js
"\8" === "8"; // true
"\9" === "9"; // true
```

Since ECMAScript 2021, these escape sequences are specified as non-octal decimal escape sequences, retaining the same behavior.

Nevertheless, the ECMAScript specification treats `\8` and `\9` in string literals as a legacy feature. This syntax is optional if the ECMAScript host is not a web browser. Browsers still have to support it, but only in non-strict mode.

Regardless of your targeted environment, these escape sequences shouldn't be used when writing new code.

## Rule Details

This rule disallows `\8` and `\9` escape sequences in string literals.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-nonoctal-decimal-escape: "error"*/

"\8";

"\9";

const foo = "w\8less";

const bar = "December 1\9";

const baz = "Don't use \8 and \9 escapes.";

const quux = "\0\8";
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-nonoctal-decimal-escape: "error"*/

"8";

"9";

const foo = "w8less";

const bar = "December 19";

const baz = "Don't use \\8 and \\9 escapes.";

const quux = "\0\u0038";
```

## Options

This rule has no options.
