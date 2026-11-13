---
title: "vitest/require-local-test-context-for-concurrent-snapshots"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/require-local-test-context-for-concurrent-snapshots.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/require-local-test-context-for-concurrent-snapshots

📝 Require local Test Context for concurrent snapshot tests.

💼⚠️ This rule is enabled in the ✅ `recommended` config. This rule _warns_ in the 🌐 `all` config.

## Rule details

Examples of **incorrect** code for this rule:

```js
test.concurrent('myLogic', () => {
  expect(true).toMatchSnapshot()
})

describe.concurrent('something', () => {
  test('myLogic', () => {
    expect(true).toMatchInlineSnapshot()
  })
})
```

Examples of **correct** code for this rule:

```js
test.concurrent('myLogic', ({ expect }) => {
  expect(true).toMatchSnapshot()
})

test.concurrent('myLogic', (context) => {
  context.expect(true).toMatchSnapshot()
})
```
