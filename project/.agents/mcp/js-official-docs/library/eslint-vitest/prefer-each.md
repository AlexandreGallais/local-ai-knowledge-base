---
title: "vitest/prefer-each"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-each.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-each

📝 Enforce using `each` rather than manual loops.

⚠️ This rule _warns_ in the 🌐 `all` config.

```js
// bad
for (const item of items) {
  describe(item, () => {
    expect(item).toBe('foo')
  })
}

// good
describe.each(items)('item', (item) => {
  expect(item).toBe('foo')
})
```
