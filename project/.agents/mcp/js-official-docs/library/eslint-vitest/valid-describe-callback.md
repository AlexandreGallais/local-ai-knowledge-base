---
title: "vitest/valid-describe-callback"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/valid-describe-callback.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/valid-describe-callback

📝 Enforce valid describe callback.

💼⚠️ This rule is enabled in the ✅ `recommended` config. This rule _warns_ in the 🌐 `all` config.

This rule validates the second parameter of a `describe()` function is a callback.

- should not contain parameters
- should not contain any `return` statements

The following are considered warnings:

```js
// callback function parameters are not allowed
describe('myfunc', (done) => {
  //
})

describe('myfunc', () => {
  // no return statements are allowed in a block of a callback function
  return Promise.resolve().then(() => {
    //
  })
})

// returning a value from a describe block is not allowed
describe('myfunc', () =>
  it('should do something', () => {
    //
  }))
```

The following are not considered warnings:

```js
describe('myfunc', async () => {
  //
})
describe('myfunc', () => {
  it('should do something', () => {
    //
  })
})
```
