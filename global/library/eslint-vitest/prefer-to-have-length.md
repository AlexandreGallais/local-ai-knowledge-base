---
title: "vitest/prefer-to-have-length"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-to-have-length.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-to-have-length

📝 Enforce using toHaveLength().

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

```js
// bad
expect(files.length).toStrictEqual(1)

// good
expect(files).toHaveLength(1)
```
