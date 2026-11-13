---
title: "no-lonely-if"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-lonely-if.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-lonely-if

If an `if` statement is the only statement in the `else` block, it is often clearer to use an `else if` form.

```js
if (foo) {
    // ...
} else {
    if (bar) {
        // ...
    }
}
```

should be rewritten as

```js
if (foo) {
    // ...
} else if (bar) {
    // ...
}
```

## Rule Details

This rule disallows `if` statements as the only statement in `else` blocks.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-lonely-if: "error"*/

if (condition) {
    // ...
} else {
    if (anotherCondition) {
        // ...
    }
}

if (condition) {
    // ...
} else {
    if (anotherCondition) {
        // ...
    } else {
        // ...
    }
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-lonely-if: "error"*/

if (condition) {
    // ...
} else if (anotherCondition) {
    // ...
}

if (condition) {
    // ...
} else if (anotherCondition) {
    // ...
} else {
    // ...
}

if (condition) {
    // ...
} else {
    if (anotherCondition) {
        // ...
    }
    doSomething();
}
```

## Options

This rule has no options.

## When Not To Use It

Disable this rule if the code is clearer without requiring the `else if` form.
