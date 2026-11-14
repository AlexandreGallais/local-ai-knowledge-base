---
title: "vitest/no-test-prefixes"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/no-test-prefixes.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/no-test-prefixes

📝 Disallow using the `f` and `x` prefixes in favour of `.only` and `.skip`.

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

## Rule Details

Examples of **incorrect** code for this rule:

```js
xdescribe.each([])('foo', function () {})
```

Examples of **correct** code for this rule:

```js
describe.skip.each([])('foo', function () {})
```
