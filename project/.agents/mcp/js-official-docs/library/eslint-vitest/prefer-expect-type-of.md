---
title: "vitest/prefer-expect-type-of"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-expect-type-of.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-expect-type-of

📝 Enforce using `expect(...).toBeTypeOf(...)` instead of `expect(typeof ...).toBe(...)`.

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

This rule enforces using Vitest's `toBeTypeOf` matcher instead of `expect(typeof value).toBe(type)` for runtime type checking.

## Rule Details

`expect(typeof value).toBe(type)` works but is awkward and produces poor failure messages. Vitest's built-in `toBeTypeOf` matcher does the same `typeof` comparison with a clearer API and better error output. This rule rewrites the `typeof`-based pattern to use `toBeTypeOf` automatically.

### Incorrect

```ts
import { test, expect } from 'vitest'

test('type checking', () => {
  expect(typeof 'hello').toBe('string')
  expect(typeof 42).toBe('number')
  expect(typeof true).toBe('boolean')
  expect(typeof {}).toBe('object')
  expect(typeof (() => {})).toBe('function')
  expect(typeof Symbol()).toBe('symbol')
  expect(typeof 123n).toBe('bigint')
  expect(typeof undefined).toBe('undefined')
})
```

### Correct

```ts
import { test, expect } from 'vitest'

test('type checking', () => {
  expect('hello').toBeTypeOf('string')
  expect(42).toBeTypeOf('number')
  expect(true).toBeTypeOf('boolean')
  expect({}).toBeTypeOf('object')
  expect(() => {}).toBeTypeOf('function')
  expect(Symbol()).toBeTypeOf('symbol')
  expect(123n).toBeTypeOf('bigint')
  expect(undefined).toBeTypeOf('undefined')
})
```
