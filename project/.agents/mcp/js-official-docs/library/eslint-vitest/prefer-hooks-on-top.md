---
title: "vitest/prefer-hooks-on-top"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-hooks-on-top.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-hooks-on-top

📝 Enforce having hooks before any test cases.

⚠️ This rule _warns_ in the 🌐 `all` config.

```ts
// bad

describe('foo', () => {
  it('bar', () => {
    // ...
  })

  beforeEach(() => {
    // ...
  })
})

// good

describe('foo', () => {
  beforeEach(() => {
    // ...
  })

  it('bar', () => {
    // ...
  })
})
```
