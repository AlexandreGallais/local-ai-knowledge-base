---
title: "require-yield"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/require-yield.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# require-yield

## Rule Details

This rule generates warnings for generator functions that do not have the `yield` keyword.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint require-yield: "error"*/

function* foo() {
  return 10;
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint require-yield: "error"*/

function* foo() {
  yield 5;
  return 10;
}

function bar() {
  return 10;
}

// This rule does not warn on empty generator functions.
function* baz() { }
```

## Options

This rule has no options.

## When Not To Use It

If you don't want to notify generator functions that have no `yield` expression, then it's safe to disable this rule.
