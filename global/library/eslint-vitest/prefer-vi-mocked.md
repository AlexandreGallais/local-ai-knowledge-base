---
title: "vitest/prefer-vi-mocked"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-vi-mocked.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-vi-mocked

📝 Require `vi.mocked()` over `fn as Mock`.

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

When working with mocks of functions using Vitest, it's recommended to use the
vi.mocked() helper function to properly type the mocked functions.
This rule enforces the use of `vi.mocked()` for better type safety and readability.

Restricted types:

- `Mock`
- `MockedFunction`
- `MockedClass`
- `MockedObject`

## Rule details

The following patterns are warnings:

```typescript
;(foo as Mock).mockReturnValue(1)
const mock = (foo as Mock).mockReturnValue(1)
;(foo as unknown as Mock).mockReturnValue(1)
;(Obj.foo as Mock).mockReturnValue(1)
;([].foo as Mock).mockReturnValue(1)
```

The following patterns are not warnings:

```js
vi.mocked(foo).mockReturnValue(1)
const mock = vi.mocked(foo).mockReturnValue(1)
vi.mocked(Obj.foo).mockReturnValue(1)
vi.mocked([].foo).mockReturnValue(1)
```
