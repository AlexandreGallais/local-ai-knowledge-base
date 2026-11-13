---
title: "vitest/prefer-to-be-falsy"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-to-be-falsy.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-to-be-falsy

📝 Enforce using toBeFalsy().

🚫 This rule is _disabled_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

## Rule Details

This rule aims to enforce the use of `toBeFalsy()` over `toBe(false)`

Examples of **incorrect** code for this rule:

```js
expect(foo).toBe(false)
expectTypeOf(foo).toBe(false)
```

Examples of **correct** code for this rule:

```js
expect(foo).toBeFalsy()
expectTypeOf(foo).toBeFalsy()
```
