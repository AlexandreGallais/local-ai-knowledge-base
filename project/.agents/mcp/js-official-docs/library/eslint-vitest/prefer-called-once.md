---
title: "vitest/prefer-called-once"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-called-once.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-called-once

📝 Enforce using `toBeCalledOnce()` or `toHaveBeenCalledOnce()`.

🚫 This rule is _disabled_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

## Rule Details

This rule aims to enforce the use of `toBeCalledOnce()` or `toHaveBeenCalledOnce()` over `toBeCalledTimes(1)` or `toHaveBeenCalledTimes(1)`.

Examples of **incorrect** code for this rule:

```ts
test('foo', () => {
  const mock = vi.fn()
  mock('foo')
  expect(mock).toBeCalledTimes(1)
  expect(mock).toHaveBeenCalledTimes(1)
})
```

Examples of **correct** code for this rule:

```ts
test('foo', () => {
  const mock = vi.fn()
  mock('foo')
  expect(mock).toBeCalledOnce()
  expect(mock).toHaveBeenCalledOnce()
})
```
