---
title: "no-debugger"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-debugger.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-debugger

The `debugger` statement is used to tell the executing JavaScript environment to stop execution and start up a debugger at the current point in the code. This has fallen out of favor as a good practice with the advent of modern debugging and development tools. Production code should definitely not contain `debugger`, as it will cause the browser to stop executing code and open an appropriate debugger.

## Rule Details

This rule disallows `debugger` statements.

Example of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-debugger: "error"*/

function isTruthy(x) {
    debugger;
    return Boolean(x);
}
```

Example of **correct** code for this rule:

**Correct:**

```js
/*eslint no-debugger: "error"*/

function isTruthy(x) {
    return Boolean(x); // set a breakpoint at this line
}
```

## Options

This rule has no options.

## When Not To Use It

If your code is still very much in development and don't want to worry about stripping `debugger` statements, then turn this rule off. You'll generally want to turn it back on when testing code prior to deployment.
