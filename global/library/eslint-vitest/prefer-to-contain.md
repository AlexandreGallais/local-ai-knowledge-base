---
title: "vitest/prefer-to-contain"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-to-contain.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-to-contain

📝 Enforce using toContain().

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

This rule triggers a warning if `toBe()`, `toEqual()` or `toStrictEqual()` is used to assert object inclusion in an array.

The following patterns are considered warnings:

```ts
expect(a.includes(b)).toBe(true)
expect(a.includes(b)).toEqual(true)
expect(a.includes(b)).toStrictEqual(true)
```

The following patterns are not considered warnings:

```ts
expect(a).toContain(b)
```
