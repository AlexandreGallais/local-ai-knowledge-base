---
title: "vitest/no-identical-title"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/no-identical-title.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/no-identical-title

📝 Disallow identical titles.

💼⚠️ This rule is enabled in the ✅ `recommended` config. This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

## Rule Details

Examples of **incorrect** code for this rule:

```js
it('is awesome', () => {
  /* ... */
})

it('is awesome', () => {
  /* ... */
})
```

Examples of **correct** code for this rule:

```js
it('is awesome', () => {
  /* ... */
})

it('is very awesome', () => {
  /* ... */
})
```
