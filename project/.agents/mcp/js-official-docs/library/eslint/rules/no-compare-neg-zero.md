---
title: "no-compare-neg-zero"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-compare-neg-zero.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-compare-neg-zero

## Rule Details

The rule should warn against code that tries to compare against `-0`, since that will not work as intended. That is, code like `x === -0` will pass for both `+0` and `-0`. The author probably intended `Object.is(x, -0)`.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/* eslint no-compare-neg-zero: "error" */

if (x === -0) {
    // doSomething()...
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/* eslint no-compare-neg-zero: "error" */

if (x === 0) {
    // doSomething()...
}
```

**Correct:**

```js
/* eslint no-compare-neg-zero: "error" */

if (Object.is(x, -0)) {
    // doSomething()...
}
```

## Options

This rule has no options.
