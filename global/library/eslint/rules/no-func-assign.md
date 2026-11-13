---
title: "no-func-assign"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-func-assign.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-func-assign

JavaScript functions can be written as a FunctionDeclaration `function foo() { ... }` or as a FunctionExpression `const foo = function() { ... };`. While a JavaScript interpreter might tolerate it, overwriting/reassigning a function written as a FunctionDeclaration is often indicative of a mistake or issue.

```js
function foo() {}
foo = bar;
```

## Rule Details

This rule disallows reassigning `function` declarations.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-func-assign: "error"*/

function foo() {}
foo = bar;

function baz() {
    baz = bar;
}

let a = function hello() {
  hello = 123;
};
```

Examples of **incorrect** code for this rule, unlike the corresponding rule in JSHint:

**Incorrect:**

```js
/*eslint no-func-assign: "error"*/

foo = bar;
function foo() {}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-func-assign: "error"*/

let foo = function () {}
foo = bar;

function baz(baz) { // `baz` is shadowed.
    baz = bar;
}

function qux() {
    const qux = bar;  // `qux` is shadowed.
}
```

## Options

This rule has no options.
