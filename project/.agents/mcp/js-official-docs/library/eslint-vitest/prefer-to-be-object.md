---
title: "vitest/prefer-to-be-object"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-to-be-object.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-to-be-object

📝 Enforce using toBeObject().

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

```js
expectTypeOf({}).not.toBeInstanceOf(Object)

// should be
expectTypeOf({}).not.toBeObject()
```
