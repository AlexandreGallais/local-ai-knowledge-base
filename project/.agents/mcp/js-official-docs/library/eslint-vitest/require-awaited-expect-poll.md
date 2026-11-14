---
title: "vitest/require-awaited-expect-poll"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/require-awaited-expect-poll.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/require-awaited-expect-poll

📝 Ensure that every `expect.poll` call is awaited.

⚠️ This rule _warns_ in the 🌐 `all` config.

### Rule Details

This rule ensures that promises returned by `expect.poll` & `expect.element` calls are handled properly.

Examples of **incorrect** code for this rule:

```js
test('element exists', () => {
  asyncInjectElement()

  expect.poll(() => document.querySelector('.element')).toBeInTheDocument()
})
```

Examples of **correct** code for this rule:

```js
test('element exists', async () => {
  asyncInjectElement()

  await expect
    .poll(() => document.querySelector('.element'))
    .toBeInTheDocument()
})
```

```js
test('element exists', () => {
  asyncInjectElement()

  return expect
    .poll(() => document.querySelector('.element'))
    .toBeInTheDocument()
})
```
