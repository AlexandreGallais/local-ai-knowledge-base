---
title: "vitest/prefer-called-exactly-once-with"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-called-exactly-once-with.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-called-exactly-once-with

📝 Prefer `toHaveBeenCalledExactlyOnceWith` over `toHaveBeenCalledOnce` and `toHaveBeenCalledWith`.

💼⚠️ This rule is enabled in the ✅ `recommended` config. This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Examples of **incorrect** code for this rule:

```js
test('foo', () => {
  const mock = vi.fn()
  mock('foo')
  expect(mock).toHaveBeenCalledOnce()
  expect(mock).toHaveBeenCalledWith('foo')
})
```

```js
test('foo', () => {
  const mock = vi.fn()
  mock('foo')
  expect(mock).toHaveBeenCalledExactlyOnceWith('foo')
})
```
