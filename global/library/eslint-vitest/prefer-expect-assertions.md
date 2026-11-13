---
title: "vitest/prefer-expect-assertions"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-expect-assertions.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-expect-assertions

📝 Enforce using expect assertions instead of callbacks.

⚠️ This rule _warns_ in the 🌐 `all` config.

💡 This rule is manually fixable by editor suggestions.

Ensure every test to have either `expect.assertions(<number of assertions>)` OR
`expect.hasAssertions()` as its first expression.

This will warn if a test has no assertions, or if it has assertions but they are not the first expression.

## Examples

Examples of **incorrect** code for this rule:

```js
test('no assertions', () => {
  // ...
})

test('assertions not first', () => {
  expect(true).toBe(true)
  // ...
})
```

Examples of **correct** code for this rule:

```js
test('assertions first', () => {
  expect.assertions(1)
  // ...
})

test('assertions first', () => {
  expect.hasAssertions()
  // ...
})
```

## Options

| Name                                | Description                                                                  | Type    | Default |
| :---------------------------------- | :--------------------------------------------------------------------------- | :------ | :------ |
| `disallowHasAssertions`             | Warn when `expect.hasAssertions()` is used instead of `expect.assertions()`. | Boolean | `false` |
| `onlyFunctionsWithAsyncKeyword`     | Only check test functions declared with the async keyword.                   | Boolean | `false` |
| `onlyFunctionsWithExpectInCallback` | Only check test functions that contain `expect` in callbacks.                | Boolean | `false` |
| `onlyFunctionsWithExpectInLoop`     | Only check test functions that contain `expect` inside loops.                | Boolean | `false` |

`onlyFunctionsWithAsyncKeyword` (default: `false`)

When `true`, only functions with the `async` keyword will be checked.

when this option is enabled the following code will be considered incorrect:

```js
test('assertions first', async () => {
  const data = await fetchData()
  expect(data).toBe('peanut butter')
})
```

To fix this, you'll need to add `expect.assertions(1)` or `expect.hasAssertions()` as the first expression:

```js
test('assertions first', async () => {
  expect.assertions(1)
  const data = await fetchData()
  expect(data).toBe('peanut butter')
})
```

`onlyFunctionsWithExpectInLoop` (default: `false`)

When `true`, only functions with `expect` in a loop will be checked.

when this option is enabled the following code will be considered incorrect:

```js
test('assertions first', () => {
  for (let i = 0; i < 10; i++) {
    expect(i).toBeLessThan(10)
  }
})
```

To fix this, you'll need to add `expect.assertions(1)` or `expect.hasAssertions()` as the first expression:

```js
test('assertions first', () => {
  expect.hasAssertions()
  for (let i = 0; i < 10; i++) {
    expect(i).toBeLessThan(10)
  }
})
```

`onlyFunctionsWithExpectInCallback`

When `true`, only functions with `expect` in a callback will be checked.

when this option is enabled the following code will be considered incorrect:

```js
test('assertions first', () => {
  fetchData((data) => {
    expect(data).toBe('peanut butter')
  })
})
```

To fix this, you'll need to add `expect.assertions(1)` or `expect.hasAssertions()` as the first expression:

```js
test('assertions first', () => {
  expect.assertions(1)
  fetchData((data) => {
    expect(data).toBe('peanut butter')
  })
})
```

`disallowHasAssertions` (default: `false`)

When `true`, `expect.hasAssertions()` will be reported in favor of `expect.assertions()`.
Suggestions for missing assertions will only include `expect.assertions()`.

when this option is enabled the following code will be considered incorrect:

```js
test('has assertions', () => {
  expect.hasAssertions()
  expect(value).toBe(1)
})
```

To fix this, use `expect.assertions(<number of assertions>)` instead:

```js
test('has assertions', () => {
  expect.assertions(1)
  expect(value).toBe(1)
})
```
