---
title: "vitest/prefer-to-be"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-to-be.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-to-be

📝 Enforce using toBe().

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

### Correct

```ts
import { test } from 'vitest'

test('foo', () => {
  expect(1).toBe(1)
})
```

### Incorrect

```ts
import { test } from 'vitest'

test('foo', () => {
  expect(1).toEqual(1)
})
```
