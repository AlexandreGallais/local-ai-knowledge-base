---
title: "vitest/prefer-called-times"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-called-times.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-called-times

📝 Enforce using `toBeCalledTimes(1)` or `toHaveBeenCalledTimes(1)`.

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

## Rule Details

This rule aims to enforce the use of `toBeCalledTimes(1)` or `toHaveBeenCalledTimes(1)` over `toBeCalledOnce()` or `toHaveBeenCalledOnce()`.

Examples of **incorrect** code for this rule:

```ts
test('foo', () => {
  const mock = vi.fn()
  mock('foo')
  expect(mock).toBeCalledOnce()
  expect(mock).toHaveBeenCalledOnce()
})
```

Examples of **correct** code for this rule:

```ts
test('foo', () => {
  const mock = vi.fn()
  mock('foo')
  expect(mock).toBeCalledTimes(1)
  expect(mock).toHaveBeenCalledTimes(1)
})
```
