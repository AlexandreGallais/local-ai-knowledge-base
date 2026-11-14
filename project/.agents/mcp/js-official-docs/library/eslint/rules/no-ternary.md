---
title: "no-ternary"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-ternary.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-ternary

The ternary operator is used to conditionally assign a value to a variable. Some believe that the use of ternary operators leads to unclear code.

```js
const foo = isBar ? baz : qux;
```

## Rule Details

This rule disallows ternary operators.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-ternary: "error"*/

const foo = isBar ? baz : qux;

function quux() {
  return foo ? bar() : baz();
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-ternary: "error"*/

let foo;

if (isBar) {
    foo = baz;
} else {
    foo = qux;
}

function quux() {
    if (foo) {
        return bar();
    } else {
        return baz();
    }
}
```

## Options

This rule has no options.
