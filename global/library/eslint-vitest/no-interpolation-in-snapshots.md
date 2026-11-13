---
title: "vitest/no-interpolation-in-snapshots"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/no-interpolation-in-snapshots.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/no-interpolation-in-snapshots

📝 Disallow string interpolation in snapshots.

💼⚠️ This rule is enabled in the ✅ `recommended` config. This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

## Rule Details

This rule aims to prevent the use of string interpolation in snapshots.

### Fail

```ts
expect('foo').toMatchSnapshot(`${bar}`)
expect('foo').toMatchSnapshot(`foo ${bar}`)
```

### Pass

```ts
expect('foo').toMatchSnapshot()
expect('foo').toMatchSnapshot('foo')
expect('foo').toMatchSnapshot(bar)
```
