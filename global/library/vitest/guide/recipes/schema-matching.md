---
title: "Schema-Driven Assertions | Recipes"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/recipes/schema-matching.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Schema-Driven Assertions

If your project already validates data with Zod, Valibot, or ArkType, those schemas already describe what a valid value looks like. Reusing them in tests is more direct than duplicating shape checks across `toEqual` and `toMatchObject`.

`expect.schemaMatching` <Version>4.0.0</Version> is an asymmetric matcher that takes any Standard Schema v1 object and passes if the value conforms to it.

## Pattern

```ts
import { expect, test } from 'vitest'
import { z } from 'zod'

test('email validation', () => {
  const user = { email: 'user@example.com' }

  expect(user).toEqual({
    email: expect.schemaMatching(z.string().email()),
  })
})
```

`expect.schemaMatching` is an asymmetric matcher, so it composes inside any equality check the same way `expect.any` or `expect.stringMatching` do:

- `toEqual` / `toStrictEqual`
- `toMatchObject`
- `toContainEqual`
- `toThrow`
- `toHaveBeenCalledWith`
- `toHaveReturnedWith`
- `toHaveBeenResolvedWith`

## Works with any Standard Schema library

```ts
import { expect, test } from 'vitest'
import { z } from 'zod'
import * as v from 'valibot'
import { type } from 'arktype'

const user = { email: 'user@example.com' }

// Zod
expect(user).toEqual({
  email: expect.schemaMatching(z.string().email()),
})

// Valibot
expect(user).toEqual({
  email: expect.schemaMatching(v.pipe(v.string(), v.email())),
})

// ArkType
expect(user).toEqual({
  email: expect.schemaMatching(type('string.email')),
})
```

## Verifying call arguments

A common use is asserting that a mock was called with data that conforms to a schema, without spelling out every field:

```ts
import { expect, test, vi } from 'vitest'
import { z } from 'zod'

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  createdAt: z.date(),
})

test('persists a valid user', () => {
  const repo = { save: vi.fn() }
  registerUser(repo, { email: 'user@example.com' })

  expect(repo.save).toHaveBeenCalledWith(expect.schemaMatching(UserSchema))
})
```

Reach for `schemaMatching` when you already have a schema for the value and would otherwise spell out every property by hand. It's especially useful for assertions over generated fields like UUIDs or timestamps, where you can validate the format without predicting the exact value.

## See also

- `expect.schemaMatching`
- Standard Schema
- Asymmetric Matchers
