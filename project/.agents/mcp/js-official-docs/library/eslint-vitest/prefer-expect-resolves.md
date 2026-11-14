---
title: "vitest/prefer-expect-resolves"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-expect-resolves.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-expect-resolves

📝 Enforce using `expect().resolves` over `expect(await ...)` syntax.

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

```ts
// bad
it('passes', async () => {
  expect(await someValue()).toBe(true)
})

// good
it('passes', async () => {
  await expect(someValue()).resolves.toBe(true)
})
```
