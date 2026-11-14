---
title: "vitest/no-commented-out-tests"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/no-commented-out-tests.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/no-commented-out-tests

📝 Disallow commented out tests.

💼⚠️ This rule is enabled in the ✅ `recommended` config. This rule _warns_ in the 🌐 `all` config.

## Rule Details

This rule aims to prevent commented out tests.

Examples of **incorrect** code for this rule:

```ts
// test('foo', () => {
//   expect(1).toBe(1)
// })
```

Examples of **correct** code for this rule:

```ts
test('foo', () => {
  expect(1).toBe(1)
})
```
