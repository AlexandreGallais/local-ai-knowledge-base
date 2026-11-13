---
title: "vitest/prefer-called-with"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-called-with.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-called-with

📝 Enforce using `toBeCalledWith()` or `toHaveBeenCalledWith()`.

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

## Rule Details

This rule aims to enforce the use of `toBeCalledWith()` or `toHaveBeenCalledWith()` over `toBeCalled()` or `toHaveBeenCalled()`, and `toHaveBeenCalledExactlyOnceWith()` over `toHaveBeenCalledOnce()`.

Examples of **incorrect** code for this rule:

```ts
test('foo', () => {
  const mock = vi.fn()
  mock('foo')
  expect(mock).toBeCalled()
  expect(mock).toHaveBeenCalled()
  expect(mock).toHaveBeenCalledOnce()
})
```

Examples of **correct** code for this rule:

```ts
test('foo', () => {
  const mock = vi.fn()
  mock('foo')
  expect(mock).toBeCalledWith('foo')
  expect(mock).toHaveBeenCalledWith('foo')
  expect(mock).toHaveBeenCalledExactlyOnceWith('foo')
})
```
