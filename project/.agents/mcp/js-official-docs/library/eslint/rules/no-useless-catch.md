---
title: "no-useless-catch"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-useless-catch.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-useless-catch

A `catch` clause that only rethrows the original error is redundant, and has no effect on the runtime behavior of the program. These redundant clauses can be a source of confusion and code bloat, so it's better to disallow these unnecessary `catch` clauses.

## Rule Details

This rule reports `catch` clauses that only `throw` the caught error.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-useless-catch: "error"*/

try {
  doSomethingThatMightThrow();
} catch (e) {
  throw e;
}

try {
  doSomethingThatMightThrow();
} catch (e) {
  throw e;
} finally {
  cleanUp();
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-useless-catch: "error"*/

try {
  doSomethingThatMightThrow();
} catch (e) {
  doSomethingBeforeRethrow();
  throw e;
}

try {
  doSomethingThatMightThrow();
} catch (e) {
  handleError(e);
}

try {
  doSomethingThatMightThrow();
} finally {
  cleanUp();
}
```

## Options

This rule has no options.

## When Not To Use It

If you don't want to be notified about unnecessary catch clauses, you can safely disable this rule.
