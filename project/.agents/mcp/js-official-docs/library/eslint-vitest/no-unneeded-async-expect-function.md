---
title: "vitest/no-unneeded-async-expect-function"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/no-unneeded-async-expect-function.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/no-unneeded-async-expect-function

📝 Disallow unnecessary async function wrapper for expected promises.

💼⚠️ This rule is enabled in the ✅ `recommended` config. This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

## Rule Details

Disallow wrapping `expect` calls with unnecessary `async` functions when the awaited call can be passed directly. If the only statement inside the `async` wrapper is `await someCall()`, pass `someCall()` straight to `expect` instead.

Examples of **incorrect** code for this rule:

```js
it('wrong1', async () => {
  await expect(async () => {
    await doSomethingAsync()
  }).rejects.toThrow()
})

it('wrong2', async () => {
  await expect(async function () {
    await doSomethingAsync()
  }).rejects.toThrow()
})

it('wrong3', async () => {
  await expect(async () => await doSomethingAsync()).rejects.toThrow()
})
```

Examples of **correct** code for this rule

```js
it('right1', async () => {
  await expect(doSomethingAsync()).rejects.toThrow()
})
```
