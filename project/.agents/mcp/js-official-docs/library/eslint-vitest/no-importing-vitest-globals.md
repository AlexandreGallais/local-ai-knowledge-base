---
title: "vitest/no-importing-vitest-globals"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/no-importing-vitest-globals.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/no-importing-vitest-globals

📝 Disallow importing Vitest globals.

🚫 This rule is _disabled_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

## Rule Details

This rule disallows importing Vitest globals.

Examples of **incorrect** code for this rule:

```ts
import { test, expect } from 'vitest'

test('foo', () => {
  expect(1).toBe(1)
})
```

```ts
const { test, expect } = require('vitest')

test('foo', () => {
  expect(1).toBe(1)
})
```

Examples of **correct** code for this rule:

```ts
test('foo', () => {
  expect(1).toBe(1)
})
```
