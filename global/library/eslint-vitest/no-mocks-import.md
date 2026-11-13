---
title: "vitest/no-mocks-import"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/no-mocks-import.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/no-mocks-import

📝 Disallow importing from **mocks** directory.

💼⚠️ This rule is enabled in the ✅ `recommended` config. This rule _warns_ in the 🌐 `all` config.

## Rule Details

This rule aims to prevent importing from the `__mocks__` directory.

### Fail

```ts
import { foo } from '__mocks__/foo'
```

### Pass

```ts
import { foo } from 'foo'
```
