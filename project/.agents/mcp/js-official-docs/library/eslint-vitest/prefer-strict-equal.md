---
title: "vitest/prefer-strict-equal"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-strict-equal.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-strict-equal

📝 Enforce strict equal over equal.

⚠️ This rule _warns_ in the 🌐 `all` config.

💡 This rule is manually fixable by editor suggestions.

```ts
// bad

expect(something).toEqual(somethingElse)

// good
expect(something).toStrictEqual(somethingElse)
```
