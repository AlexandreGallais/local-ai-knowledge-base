---
title: "wrap-regex"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/wrap-regex.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# wrap-regex

When a regular expression is used in certain situations, it can end up looking like a division operator. For example:

```js
function a() {
    return /foo/.test("bar");
}
```

## Rule Details

This is used to disambiguate the slash operator and facilitates more readable code.

Example of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint wrap-regex: "error"*/

function a() {
    return /foo/.test("bar");
}
```

Example of **correct** code for this rule:

**Correct:**

```js
/*eslint wrap-regex: "error"*/

function a() {
    return (/foo/).test("bar");
}
```
