---
title: "no-octal-escape"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-octal-escape.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-octal-escape

As of the ECMAScript 5 specification, octal escape sequences in string literals are deprecated and should not be used. Unicode escape sequences should be used instead.

```js
const foo = "Copyright \251";
```

## Rule Details

This rule disallows octal escape sequences in string literals.

If ESLint parses code in strict mode, the parser (instead of this rule) reports the error.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-octal-escape: "error"*/

const foo = "Copyright \251";
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-octal-escape: "error"*/

const foo = "Copyright \u00A9";   // unicode

const buz = "Copyright \xA9";     // hexadecimal
```

## Options

This rule has no options.
