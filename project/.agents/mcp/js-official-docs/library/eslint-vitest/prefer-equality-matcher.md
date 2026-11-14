---
title: "vitest/prefer-equality-matcher"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-equality-matcher.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-equality-matcher

📝 Enforce using the built-in equality matchers.

⚠️ This rule _warns_ in the 🌐 `all` config.

💡 This rule is manually fixable by editor suggestions.

## Rule Details

This rule aims to enforce the use of the built-in equality matchers.

Examples of **incorrect** code for this rule:

```ts
// bad
expect(1 == 1).toBe(1)

// bad
expect(1).toEqual(1)
```
