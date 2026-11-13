---
title: "vitest/valid-expect-in-promise"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/valid-expect-in-promise.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/valid-expect-in-promise

📝 Require promises that have expectations in their chain to be valid.

💼⚠️ This rule is enabled in the ✅ `recommended` config. This rule _warns_ in the 🌐 `all` config.

This rule flags any promises within the body of a test that include expectations that have either not been returned or awaited.

The following patterns is considered warning:

```js
test('promise test', async () => {
  something().then((value) => {
    expect(value).toBe('red')
  })
})

test('promises test', () => {
  const onePromise = something().then((value) => {
    expect(value).toBe('red')
  })
  const twoPromise = something().then((value) => {
    expect(value).toBe('blue')
  })

  return Promise.any([onePromise, twoPromise])
})
```

The following pattern is not warning:

```js
test('promise test', async () => {
  await something().then((value) => {
    expect(value).toBe('red')
  })
})

test('promises test', () => {
  const onePromise = something().then((value) => {
    expect(value).toBe('red')
  })
  const twoPromise = something().then((value) => {
    expect(value).toBe('blue')
  })

  return Promise.all([onePromise, twoPromise])
})
```
