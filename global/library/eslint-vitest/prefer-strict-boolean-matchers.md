---
title: "vitest/prefer-strict-boolean-matchers"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-strict-boolean-matchers.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-strict-boolean-matchers

📝 Enforce using `toBe(true)` and `toBe(false)` over matchers that coerce types to boolean.

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

This rule enforces using `toBe(true)` and `toBe(false)`, which only match if the value is the corresponding boolean value. This is unlike `toBeTruthy()`, which matches any truthy value, such as a non-zero number or a non-empty string (which are, conversely, matched by `toBeFalsy()`).

```js
// bad
expect(foo).toBeTruthy()
expectTypeOf(foo).toBeTruthy()
expect(foo).toBeFalsy()
expectTypeOf(foo).toBeFalsy()

// good
expect(foo).toBe(true)
expectTypeOf(foo).toBe(true)
expect(foo).toBe(false)
expectTypeOf(foo).toBe(false)
```
