---
title: "vitest/no-conditional-tests"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/no-conditional-tests.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/no-conditional-tests

📝 Disallow conditional tests.

⚠️ This rule _warns_ in the 🌐 `all` config.

## Rule Details

Examples of **incorrect** code for this rule:

```js
describe('my tests', () => {
  if (true) {
    it('is awesome', () => {
      doTheThing()
    })
  }
})
```

Examples of **correct** code for this rule:

```js
describe('my tests', () => {
  it('is awesome', () => {
    doTheThing()
  })
})
```
