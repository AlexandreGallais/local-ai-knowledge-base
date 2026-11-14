---
title: "space-after-function-name"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/space-after-function-name.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# space-after-function-name

Enforces consistent spacing after name in function definitions.

**Important:**
This rule was removed in ESLint v1.0.0 and replaced by the space-before-function-paren rule.

Whitespace between a function name and its parameter list is optional.

```js
function withoutSpace(x) {
    // ...
}

function withSpace (x) {
    // ...
}
```

Some style guides may require a consistent spacing for function names.

## Rule Details

This rule aims to enforce a consistent spacing after function names. It takes one argument. If it is `"always"` then all function names must be followed by at least one space. If `"never"` then there should be no spaces between the name and the parameter list. The default is `"never"`.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
function foo (x) {
    // ...
}

var x = function named (x) {};

// When ["error", "always"]
function bar(x) {
    // ...
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
function foo(x) {
    // ...
}

var x = function named(x) {};

// When ["error", "always"]
function bar (x) {
    // ...
}
```
