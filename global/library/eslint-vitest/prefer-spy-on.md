---
title: "vitest/prefer-spy-on"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-spy-on.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-spy-on

📝 Enforce using `vi.spyOn`.

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

## Rule details

This rule triggers a warning if an object's property is overwritten with a vitest mock.

```ts
Date.now = vi.fn()
Date.now = vi.fn(() => 10)
```

These patterns would not be considered warnings:

```ts
vi.spyOn(Date, 'now')
vi.spyOn(Date, 'now').mockImplementation(() => 10)
```
