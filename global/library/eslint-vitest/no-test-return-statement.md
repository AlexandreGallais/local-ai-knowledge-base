---
title: "vitest/no-test-return-statement"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/no-test-return-statement.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/no-test-return-statement

📝 Disallow return statements in tests.

⚠️ This rule _warns_ in the 🌐 `all` config.

### Rule Details

incorrect code for this rule:

```ts
import { test } from 'vitest'

test('foo', () => {
  return expect(1).toBe(1)
})
```

correct code for this rule:

```ts
import { test } from 'vitest'

test('foo', () => {
  expect(1).toBe(1)
})
```
