---
title: "vitest/no-conditional-in-test"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/no-conditional-in-test.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/no-conditional-in-test

📝 Disallow conditional tests.

⚠️ This rule _warns_ in the 🌐 `all` config.

### Rule Details

This rule aims to prevent conditional tests.

Examples of **incorrect** code for this rule:

```js
test('my test', () => {
  if (true) {
    doTheThing()
  }
})
```

Examples of **correct** code for this rule:

```js
test('my test', () => {
  expect(true).toBe(true)
})
```
