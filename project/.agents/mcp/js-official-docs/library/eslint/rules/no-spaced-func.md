---
title: "no-spaced-func"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-spaced-func.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-spaced-func

While it's possible to have whitespace between the name of a function and the parentheses that execute it, such patterns tend to look more like errors.

## Rule Details

This rule disallows spacing between function identifiers and their applications.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-spaced-func: "error"*/

fn ()

fn
()
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-spaced-func: "error"*/

fn()
```
