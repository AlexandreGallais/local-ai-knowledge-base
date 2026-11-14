---
title: "vitest/prefer-hooks-in-order"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-hooks-in-order.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-hooks-in-order

📝 Enforce having hooks in consistent order.

⚠️ This rule _warns_ in the 🌐 `all` config.

```js
// consistent order of hooks
;['beforeAll', 'beforeEach', 'afterEach', 'afterAll']
```

```js
// bad
afterAll(() => {
  removeMyDatabase()
})
beforeAll(() => {
  createMyDatabase()
})
```

```js
// good
beforeAll(() => {
  createMyDatabase()
})
afterAll(() => {
  removeMyDatabase()
})
```
