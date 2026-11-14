---
title: "vitest/no-done-callback"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/no-done-callback.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/no-done-callback

📝 Disallow using a callback in asynchronous tests and hooks.

❌ This rule is deprecated.

💡 This rule is manually fixable by editor suggestions.

## Rule Details

This rule aims to prevent the use of a callback in asynchronous tests and hooks.

Examples of **incorrect** code for this rule:

```js
test('foo', (done) => {
  setTimeout(done, 1000)
})

test('foo', (done) => {
  setTimeout(() => done(), 1000)
})

test('foo', (done) => {
  setTimeout(() => {
    done()
  }, 1000)
})

test('foo', (done) => {
  setTimeout(() => {
    done()
  }, 1000)
})
```

Examples of **correct** code for this rule:

```js
test('foo', async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
})

test('foo', async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 1000))
})

test('foo', async () => {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve()
    }, 1000),
  )
})

test('foo', async () => {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve()
    }, 1000),
  )
})

test.concurrent('foo', ({ expect }) => {
  expect(1).toMatchSnapshot()
})

test.concurrent('foo', (context) => {
  context.expect(1).toBe(1)
})

describe.concurrent('foo', () => {
  test('foo', ({ expect }) => {
    expect(1).toBe(1)
  })
})
```
