---
title: "prefer-exponentiation-operator"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/prefer-exponentiation-operator.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# prefer-exponentiation-operator

Introduced in ES2016, the infix exponentiation operator `**` is an alternative for the standard `Math.pow` function.

Infix notation is considered to be more readable and thus more preferable than the function notation.

## Rule Details

This rule disallows calls to `Math.pow` and suggests using the `**` operator instead.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint prefer-exponentiation-operator: "error"*/

const foo = Math.pow(2, 8);

const bar = Math.pow(a, b);

let baz = Math.pow(a + b, c + d);

let quux = Math.pow(-1, n);
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint prefer-exponentiation-operator: "error"*/

const foo = 2 ** 8;

const bar = a ** b;

let baz = (a + b) ** (c + d);

let quux = (-1) ** n;
```

## Options

This rule has no options.

## When Not To Use It

This rule should not be used unless ES2016 is supported in your codebase.
