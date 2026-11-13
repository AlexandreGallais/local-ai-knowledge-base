---
title: "vitest/no-duplicate-hooks"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/no-duplicate-hooks.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/no-duplicate-hooks

📝 Disallow duplicate hooks and teardown hooks.

⚠️ This rule _warns_ in the 🌐 `all` config.

## Rule Details

This rule aims to prevent duplicate hooks and teardown hooks.

Examples of **incorrect** code for this rule:

```ts
test('foo', () => {
  beforeEach(() => {})
  beforeEach(() => {}) // duplicate beforeEach
})
```

Examples of **correct** code for this rule:

```ts
test('foo', () => {
  beforeEach(() => {})
})
```
