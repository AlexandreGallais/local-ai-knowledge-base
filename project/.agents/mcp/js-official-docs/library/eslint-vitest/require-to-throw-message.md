---
title: "vitest/require-to-throw-message"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/require-to-throw-message.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/require-to-throw-message

📝 Require toThrow() to be called with an error message.

⚠️ This rule _warns_ in the 🌐 `all` config.

This rule triggers a warning if `toThrow()` or `toThrowError()` is used without
an error message.

The following patterns are considered warnings:

```js
test('foo', () => {
  expect(() => {
    throw new Error('foo')
  }).toThrow()
})

test('foo', () => {
  expect(() => {
    throw new Error('foo')
  }).toThrowError()
})
```

The following patterns are not considered warnings:

```js
test('foo', () => {
  expect(() => {
    throw new Error('foo')
  }).toThrow('foo')
})

test('foo', () => {
  expect(() => {
    throw new Error('foo')
  }).toThrowError('foo')
})
```
