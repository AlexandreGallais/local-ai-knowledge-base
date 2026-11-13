---
title: "no-negated-condition"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-negated-condition.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-negated-condition

Negated conditions are more difficult to understand. Code can be made more readable by inverting the condition instead.

## Rule Details

This rule disallows negated conditions in either of the following:

* `if` statements which have an `else` branch
* ternary expressions

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-negated-condition: "error"*/

if (!a) {
    doSomething();
} else {
    doSomethingElse();
}

if (a != b) {
    doSomething();
} else {
    doSomethingElse();
}

if (a !== b) {
    doSomething();
} else {
    doSomethingElse();
}

!a ? c : b
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-negated-condition: "error"*/

if (!a) {
    doSomething();
}

if (!a) {
    doSomething();
} else if (b) {
    doSomething();
}

if (a != b) {
    doSomething();
}

a ? b : c
```

## Options

This rule has no options.
