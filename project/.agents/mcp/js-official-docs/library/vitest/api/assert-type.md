---
title: "assertType"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/assert-type.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# assertType

**Warning:**
During runtime this function doesn't do anything. To enable typechecking, don't forget to pass down `--typecheck` flag.

- **Type:** `<T>(value: T): void`

You can use this function as an alternative for `expectTypeOf` to easily assert that the argument type is equal to the generic provided.

```ts
import { assertType } from 'vitest'

function concat(a: string, b: string): string
function concat(a: number, b: number): number
function concat(a: string | number, b: string | number): string | number

assertType<string>(concat('a', 'b'))
assertType<number>(concat(1, 2))
// @ts-expect-error wrong types
assertType(concat('a', 2))
```
