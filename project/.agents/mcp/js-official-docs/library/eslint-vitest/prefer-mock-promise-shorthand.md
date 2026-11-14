---
title: "vitest/prefer-mock-promise-shorthand"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-mock-promise-shorthand.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-mock-promise-shorthand

📝 Enforce mock resolved/rejected shorthands for promises.

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

```ts
// bad
vi.fn().mockReturnValue(Promise.reject(42))
vi.fn().mockImplementation(() => Promise.resolve(42))

// good
vi.fn().mockRejectedValue(42)
vi.fn().mockResolvedValue(42)
```
