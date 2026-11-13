---
title: "no-continue"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-continue.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-continue

The `continue` statement terminates execution of the statements in the current iteration of the current or labeled loop, and continues execution of the loop with the next iteration. When used incorrectly it makes code less testable, less readable and less maintainable. Structured control flow statements such as `if` should be used instead.

```js
let sum = 0,
    i;

for(i = 0; i < 10; i++) {
    if(i >= 5) {
        continue;
    }

    sum += i;
}
```

## Rule Details

This rule disallows `continue` statements.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-continue: "error"*/

let sum = 0,
    i;

for(i = 0; i < 10; i++) {
    if(i >= 5) {
        continue;
    }

    sum += i;
}
```

**Incorrect:**

```js
/*eslint no-continue: "error"*/

let sum = 0,
    i;

labeledLoop: for(i = 0; i < 10; i++) {
    if(i >= 5) {
        continue labeledLoop;
    }

    sum += i;
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-continue: "error"*/

let sum = 0,
    i;

for(i = 0; i < 10; i++) {
    if(i < 5) {
       sum += i;
    }
}
```

## Options

This rule has no options.

## Compatibility

* **JSLint**: `continue`
