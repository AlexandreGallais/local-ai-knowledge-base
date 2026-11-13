---
title: "wrap-regex"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/wrap-regex/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

---
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
/* eslint @stylistic/wrap-regex: "error" */

function a() {
    return /foo/.test("bar");
}
```

Example of **correct** code for this rule:

**Correct:**

```js
/* eslint @stylistic/wrap-regex: "error" */

function a() {
    return (/foo/).test("bar");
}
```
