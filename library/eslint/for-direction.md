---
title: "for-direction"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/for-direction.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# for-direction

A `for` loop with a stop condition that can never be reached, such as one with a counter that moves in the wrong direction, will run infinitely. While there are occasions when an infinite loop is intended, the convention is to construct such loops as `while` loops. More typically, an infinite `for` loop is a bug.

## Rule Details

This rule forbids `for` loops where the counter variable changes in such a way that the stop condition will never be met. For example, if the counter variable is increasing (i.e. `i++`) and the stop condition tests that the counter is greater than zero (`i >= 0`) then the loop will never exit.

> **Note:** This rule only checks the **direction** of the counter relative to the stop condition. It does not check the actual values to determine whether the loop will execute at least once. For example, a loop like `for (let i = 0; i < 0; i++) {}` is considered valid by this rule because the counter direction (`i++`) matches the condition (`i <`), even though the condition is false from the start (dead code).

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint for-direction: "error"*/
for (let i = 0; i < 10; i--) {
}

for (let i = 10; i >= 0; i++) {
}

for (let i = 0; i > 10; i++) {
    // counter i is on the left with >, so i++ (increasing) is the wrong direction
}

for (let i = 0; i > 0; i++) {
    // counter i is on the left with >, so i++ (increasing) is the wrong direction
}

for (let i = 0; 0 < i; i++) {
    // counter i is on the right with <, so i++ (increasing) is the wrong direction
}

for (let i = 0; 10 > i; i--) {
}

const n = -2;
for (let i = 0; i < 10; i += n) {
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint for-direction: "error"*/
for (let i = 0; i < 10; i++) {
}

for (let i = 0; 10 > i; i++) { // with counter "i" on the right
}

for (let i = 10; i >= 0; i += this.step) { // direction unknown
}

for (let i = MIN; i <= MAX; i -= 0) { // not increasing or decreasing
}

for (let i = 0; i < 0; i++) {
    // counter i is on the left with <, so i++ (increasing) is the correct direction
    // (loop never executes, but direction is consistent)
}

for (let i = 0; 0 > i; i++) {
    // counter i is on the right with >, so i++ (increasing) is the correct direction
    // (loop never executes, but direction is consistent)
}
```

## Options

This rule has no options.
