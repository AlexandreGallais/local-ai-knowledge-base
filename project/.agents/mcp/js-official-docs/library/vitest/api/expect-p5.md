---
title: "expect (part 5 of 5)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/expect.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# expect (part 5 of 5)

## expect.stringContaining

- **Type:** `(expected: any) => any`

When used with an equality check, this asymmetric matcher will return `true` if the value is a string and contains a specified substring.

```ts
import { expect, test } from 'vitest'

test('variety has "Emp" in its name', () => {
  const variety = {
    name: 'Empire',
    count: 1,
  }
  expect(variety).toEqual({
    name: expect.stringContaining('Emp'),
    count: 1,
  })
})
```

**Tip:**
You can use `expect.not` with this matcher to negate the expected value.

## expect.stringMatching

- **Type:** `(expected: any) => any`

When used with an equality check, this asymmetric matcher will return `true` if the value is a string and contains a specified substring or if the string matches a regular expression.

```ts
import { expect, test } from 'vitest'

test('variety ends with "re"', () => {
  const variety = {
    name: 'Empire',
    count: 1,
  }
  expect(variety).toEqual({
    name: expect.stringMatching(/re$/),
    count: 1,
  })
})
```

**Tip:**
You can use `expect.not` with this matcher to negate the expected value.

## expect.schemaMatching

- **Type:** `(expected: StandardSchemaV1) => any`

When used with an equality check, this asymmetric matcher will return `true` if the value matches the provided schema. The schema must implement the Standard Schema v1 specification.

```ts
import { expect, test } from 'vitest'
import { z } from 'zod'
import * as v from 'valibot'
import { type } from 'arktype'

test('email validation', () => {
  const user = { email: 'user@example.com' }

  // using Zod
  expect(user).toEqual({
    email: expect.schemaMatching(z.string().email()),
  })

  // using Valibot
  expect(user).toEqual({
    email: expect.schemaMatching(v.pipe(v.string(), v.email()))
  })

  // using ArkType
  expect(user).toEqual({
    email: expect.schemaMatching(type('string.email')),
  })
})
```

**Tip:**
You can use `expect.not` with this matcher to negate the expected value.

## expect.addSnapshotSerializer

- **Type:** `(plugin: PrettyFormatPlugin) => void`

This method adds custom serializers that are called when creating a snapshot. This is an advanced feature - if you want to know more, please read a guide on custom serializers.

If you are adding custom serializers, you should call this method inside `setupFiles`. This will affect every snapshot.

**Tip:**
If you previously used Vue CLI with Jest, you might want to install jest-serializer-vue. Otherwise, your snapshots will be wrapped in a string, which cases `"` to be escaped.

## expect.extend

- **Type:** `(matchers: MatchersObject) => void`

You can extend default matchers with your own. This function is used to extend the matchers object with custom matchers.

When you define matchers that way, you also create asymmetric matchers that can be used like `expect.stringContaining`.

```ts
import { expect, test } from 'vitest'

test('custom matchers', () => {
  expect.extend({
    toBeFoo(received) {
      const { isNot } = this
      return {
        message: () => `expected ${received} is${isNot ? ' not' : ''} foo`,
        pass: <example-value> === 'foo',
      }
    },
  })

  expect('foo').toBeFoo()
  expect({ foo: 'foo' }).toEqual({ foo: expect.toBeFoo() })
})
```

**Tip:**
If you want your matchers to appear in every test, you should call this method inside `setupFiles`.

This function is compatible with Jest's `expect.extend`, so any library that uses it to create custom matchers will work with Vitest.

If you are using TypeScript, you can extend the default `Matchers` interface in an ambient declaration file (e.g: `vitest.d.ts`) with the code below:

```ts
import 'vitest'

declare module 'vitest' {
  interface Matchers<R, T> {
    toBeFoo: () => R
  }
}
```

`R` is the assertion return type, and `T` is the type of the received value.

**Warning:**
Don't forget to include the ambient declaration file in your `tsconfig.json`.

**Tip:**
If you want to know more, checkout guide on extending matchers.

## expect.addEqualityTesters {#expect-addequalitytesters}

- **Type:** `(tester: Array<Tester>) => void`

You can use this method to define custom testers, which are methods used by matchers, to test if two objects are equal. It is compatible with Jest's `expect.addEqualityTesters`.

```ts
import { expect, test } from 'vitest'

class AnagramComparator {
  public word: string

  constructor(word: string) {
    this.word = word
  }

  equals(other: AnagramComparator): boolean {
    const cleanStr1 = this.word.replace(/ /g, '').toLowerCase()
    const cleanStr2 = other.word.replace(/ /g, '').toLowerCase()

    const sortedStr1 = cleanStr1.split('').sort().join('')
    const sortedStr2 = cleanStr2.split('').sort().join('')

    return sortedStr1 === sortedStr2
  }
}

function isAnagramComparator(a: unknown): a is AnagramComparator {
  return a instanceof AnagramComparator
}

function areAnagramsEqual(a: unknown, b: unknown): boolean | undefined {
  const isAAnagramComparator = isAnagramComparator(a)
  const isBAnagramComparator = isAnagramComparator(b)

  if (isAAnagramComparator && isBAnagramComparator) {
    return a.equals(b)
  }
  else if (isAAnagramComparator === isBAnagramComparator) {
    return undefined
  }
  else {
    return false
  }
}

expect.addEqualityTesters([areAnagramsEqual])

test('custom equality tester', () => {
  expect(new AnagramComparator('listen')).toEqual(new AnagramComparator('silent'))
})
```
