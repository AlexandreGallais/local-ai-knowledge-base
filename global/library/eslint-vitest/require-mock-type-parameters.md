---
title: "vitest/require-mock-type-parameters"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/require-mock-type-parameters.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/require-mock-type-parameters

📝 Enforce using type parameters with vitest mock functions.

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

When using `vi.fn()` to mock functions, by default, the mocked function has the type of `(...args: any[]) => any`. To add more specific types to the mocked function, a type parameter needs to be added to the call, e.g. `vi.fn<(arg1: string, arg2: boolean) => number>()`.

Additionally, there are two more mock functions with type parameters that cannot be automatically inferred by the TypeScript compiler, `vi.importActual` and `vi.importMock`. This rule doesn't by default report these function, however, the check can be enabled by setting the `checkImportFunctions` rule option.

The following patterns are considered bad:

```ts
import { vi } from 'vitest'

test('foo', () => {
  const myMockedFn = vi.fn()
})
```

The following patterns are considered OK:

```ts
import { vi } from 'vitest'

test('foo', () => {
  const myMockedFnOne = vi.fn<(arg1: string, arg2: boolean) => number>()
  const myMockedFnTwo = vi.fn<() => void>()
  const myMockedFnThree = vi.fn<any>()
})
```

## Options

| Name                   | Description                                                       | Type    | Default |
| :--------------------- | :---------------------------------------------------------------- | :------ | :------ |
| `checkImportFunctions` | Also require type parameters for `importActual` and `importMock`. | Boolean | `false` |

```json
{
  "vitest/require-mock-type-parameters": [
    "error",
    {
      "checkImportFunctions": false
    }
  ]
}
```

The following patterns are considered bad with `checkImportFunctions: true`:

```ts
import { vi } from 'vitest'

vi.mock('./example.js', async () => {
  const originalModule = await vi.importActual('./example.js')

  return { ...originalModule }
})
```

```ts
const fs = await vi.importMock('fs')
```
