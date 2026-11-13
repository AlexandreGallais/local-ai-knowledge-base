---
title: "no-octal"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-octal.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-octal

Octal literals are numerals that begin with a leading zero, such as:

```js
const num = 071;      // 57
```

Because the leading zero which identifies an octal literal has been a source of confusion and error in JavaScript code, ECMAScript 5 deprecates the use of octal numeric literals.

## Rule Details

The rule disallows octal literals.

If ESLint parses code in strict mode, the parser (instead of this rule) reports the error.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-octal: "error"*/

const num = 071;
const result = 5 + 07;
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-octal: "error"*/

const num  = "071";
```

## Options

This rule has no options.

## Compatibility

* **JSHint**: W115
