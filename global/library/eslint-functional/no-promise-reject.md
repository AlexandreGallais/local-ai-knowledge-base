---
title: "functional/no-promise-reject"
tool: "eslint-functional"
version: "10.0"
source: "https://github.com/eslint-functional/eslint-plugin-functional/blob/d7aa1dd4ae4ef804f3010a92d3e7b385153415d8/docs/rules/no-promise-reject.md"
commit: "d7aa1dd4ae4ef804f3010a92d3e7b385153415d8"
license: "MIT"
---

# functional/no-promise-reject

📝 Disallow rejecting promises.

This rule disallows rejecting promises.

## Rule Details

It is useful when using an `Option` type (something like `{ value: T } | { error: Error }`)
for handling errors. In this case a promise should always resolve with an `Option` and never reject.

### ❌ Incorrect

```js
/* eslint functional/no-promise-reject: "error" */

async function divide(x, y) {
  const [xv, yv] = await Promise.all([x, y]);

  return yv === 0
    ? Promise.reject(new Error("Cannot divide by zero."))
    : xv / yv;
}
```

### ✅ Correct

```js
/* eslint functional/no-promise-reject: "error" */

async function divide(x, y) {
  const [xv, yv] = await Promise.all([x, y]);

  return yv === 0
    ? { error: new Error("Cannot divide by zero.") }
    : { value: xv / yv };
}
```
