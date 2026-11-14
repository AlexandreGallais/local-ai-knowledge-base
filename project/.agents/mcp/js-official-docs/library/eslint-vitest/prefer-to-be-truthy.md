---
title: "vitest/prefer-to-be-truthy"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-to-be-truthy.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-to-be-truthy

📝 Enforce using `toBeTruthy`.

🚫 This rule is _disabled_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

```js
// bad
expect(foo).toBe(true)
expectTypeOf(foo).toBe(true)

// good
expect(foo).toBeTruthy()
expectTypeOf(foo).toBeTruthy()
```
