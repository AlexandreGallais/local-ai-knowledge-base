---
title: "vitest/require-test-timeout"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/require-test-timeout.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/require-test-timeout

📝 Require tests to declare a timeout.

🚫 This rule is _disabled_ in the 🌐 `all` config.

This rule ensures tests explicitly declare a timeout so long-running tests don't hang silently.

```ts
// bad
it('slow test', async () => {
  await doSomethingSlow()
})

// good (numeric timeout)
test('slow test', async () => {
  await doSomethingSlow()
}, 1000)

// good (options object)
test('slow test', { timeout: 1000 }, async () => {
  await doSomethingSlow()
})

// good (file-level)
vi.setConfig({ testTimeout: 1000 })

test('slow test', async () => {
  await doSomethingSlow()
})
```
