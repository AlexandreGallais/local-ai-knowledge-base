---
title: "Snapshot | Guide (part 2 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/snapshot.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Snapshot | Guide (part 2 of 2)

## Custom Snapshot Domain <Experimental /> <Version>4.1.4</Version> {#custom-snapshot-domain}

Custom serializers control how values are _rendered_ into snapshot strings, but comparison is still string equality. A **domain snapshot adapter** goes further: it owns the entire comparison pipeline for a custom matcher, including how to capture a value, render it, parse a stored snapshot, and match them semantically.

### The adapter interface

A domain adapter implements four methods and is generic over two types — `Captured` (what the value actually is) and `Expected` (what the stored snapshot parses into):

```ts
import type { DomainMatchResult, DomainSnapshotAdapter } from 'vitest'

const myAdapter: DomainSnapshotAdapter<Captured, Expected> = {
  name: 'my-domain',

  // Extract structured data from the received value
  capture(received: unknown): Captured { /* ... */ },

  // Render captured data as the snapshot string (what gets stored)
  render(captured: Captured): string { /* ... */ },

  // Parse a stored snapshot string into a structured expected value
  parseExpected(input: string): Expected { /* ... */ },

  // Compare captured vs expected, return pass/fail and resolved output
  match(captured: Captured, expected: Expected): DomainMatchResult { /* ... */ },
}
```

#### `DomainMatchResult`

The `match` method returns a `DomainMatchResult` with two optional string fields beyond `pass`:

- **`resolved`** — the captured value viewed through the template's lens. Where the template uses patterns (e.g. regexes) or omits details, the resolved string adopts those patterns. Where the template doesn't match, it uses literal captured values. This serves as both the actual side of diffs and the value written on `--update`. When omitted, falls back to `render(capture(received))`.

- **`expected`** — the stored template re-rendered as a string. Used as the expected side of diffs. When omitted, falls back to the raw snapshot string from the snap file or inline snapshot.

:::details Why are `Captured` and `Expected` separate types?

When a snapshot is first generated, `render(captured)` produces a plain string that gets stored. But once stored, the user can **hand-edit** it — replacing literals with regex patterns, relaxing assertions, or adding domain-specific query syntax. After editing, `parseExpected(input)` parses this modified string into a type that is _richer_ than what `capture` produces.

For example, in the key-value adapter below, `Captured` values are always `string`, but `Expected` values can be `string | RegExp`:

```ts
type KVCaptured = Record<string, string>
type KVExpected = Record<string, string | RegExp>
```

This asymmetry is what makes `--update` work correctly: `match` returns a `resolved` string that updates changed literal parts while **preserving** the user's hand-edited patterns. If both sides were the same type, there would be no way to distinguish "what the value actually is" from "what the user chose to assert" — and every update would overwrite the user's patterns.

### Build a matcher from the adapter

Register a custom matcher with `expect.extend(...)` and call the snapshot composables from `vitest`:

```ts
import { expect, Snapshots } from 'vitest'

declare module 'vitest' {
  interface Matchers<R, T> {
    toMatchMyDomainSnapshot: () => R
    toMatchMyDomainInlineSnapshot: (inlineSnapshot?: string) => R
  }
}

expect.extend({
  toMatchMyDomainSnapshot(received: unknown) {
    return Snapshots.toMatchDomainSnapshot.call(this, myAdapter, received)
  },
  toMatchMyDomainInlineSnapshot(received: unknown, inlineSnapshot?: string) {
    return Snapshots.toMatchDomainInlineSnapshot.call(
      this,
      myAdapter,
      received,
      inlineSnapshot,
    )
  },
})
```

Then use your matcher in tests:

```ts
expect(value).toMatchMyDomainSnapshot()
expect(value).toMatchMyDomainInlineSnapshot(`key=value`)
```

### Example: key-value adapter

A minimal adapter that stores objects as `key=value` lines, with regex pattern and subset key match support (full source):

```ts
import type { DomainMatchResult, DomainSnapshotAdapter } from 'vitest'

type KVCaptured = Record<string, string>
type KVExpected = Record<string, string | RegExp>

function renderKV(obj: Record<string, unknown>) {
  return `\n${Object.entries(obj).map(([k, v]) => `${k}=${v}`).join('\n')}\n`
}

export const kvAdapter: DomainSnapshotAdapter<KVCaptured, KVExpected> = {
  name: 'kv',

  capture(received: unknown): KVCaptured {
    if (received && typeof received === 'object') {
      return Object.fromEntries(
        Object.entries(received).map(([k, v]) => [k, String(v)]),
      )
    }
    throw new TypeError('kv adapter expects a plain object')
  },

  render(captured: KVCaptured): string {
    return renderKV(captured)
  },

  parseExpected(input: string): KVExpected {
    const entries = input.trim().split('\n').map((line) => {
      const eq = line.indexOf('=')
      const key = line.slice(0, eq)
      const raw = line.slice(eq + 1)
      const value = (raw.startsWith('/') && raw.endsWith('/') && raw.length > 1)
        ? new RegExp(raw.slice(1, -1))
        : raw
      return [key, value]
    })
    return Object.fromEntries(entries)
  },

  match(captured: KVCaptured, expected: KVExpected): DomainMatchResult {
    const resolvedLines: string[] = []
    let pass = true

    for (const [key, actualValue] of Object.entries(captured)) {
      const expectedValue = expected[key]

      // non-asserted keys are skipped (works as subset match)
      if (typeof expectedValue === 'undefined') {
        continue
      }

      // preserve matched pattern for normalized diff and partial update
      if (expectedValue instanceof RegExp && expectedValue.test(actualValue)) {
        resolvedLines.push(`${key}=/${expectedValue.source}/`)
        continue
      }

      resolvedLines.push(`${key}=${actualValue}`)
      pass &&= actualValue === expectedValue
    }

    return {
      pass,
      message: pass ? undefined : 'KV entries do not match',
      resolved: `\n${resolvedLines.join('\n')}\n`,
      expected: `\n${renderKV(expected)}\n`,
    }
  },
}
```

```ts
import { expect, Snapshots } from 'vitest'
import { kvAdapter } from './kv-adapter'

declare module 'vitest' {
  interface Matchers<R, T> {
    toMatchKvSnapshot: () => R
    toMatchKvInlineSnapshot: (inlineSnapshot?: string) => R
  }
}

expect.extend({
  toMatchKvSnapshot(received: unknown) {
    return Snapshots.toMatchDomainSnapshot.call(this, kvAdapter, received)
  },
  toMatchKvInlineSnapshot(received: unknown, inlineSnapshot?: string) {
    return Snapshots.toMatchDomainInlineSnapshot.call(this, kvAdapter, received, inlineSnapshot)
  },
})
```

```ts
import { expect, test } from 'vitest'

test('user data', () => {
  const user = { name: 'Alice', score: '42' }
  expect(user).toMatchKvSnapshot()
})

test('user data inline', () => {
  const user = { name: 'Alice', age: 100, score: '42' }
  expect(user).toMatchKvInlineSnapshot(`
    name=Alice
    score=/\\d+/
  `)
})
```

## Difference from Jest

Vitest provides an almost compatible Snapshot feature with Jest's with a few exceptions:

#### 1. Comment header in the snapshot file is different

```diff
- // Jest Snapshot v1, https://goo.gl/fbAQLP
+ // Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html
```

This does not really affect the functionality but might affect your commit diff when migrating from Jest.

#### 2. `printBasicPrototype` is default to `false`

Both Jest and Vitest snapshots are powered by `pretty-format`, but Vitest applies its own snapshot defaults on top of `@vitest/pretty-format`. In particular, Vitest sets `printBasicPrototype` to `false` to provide a cleaner snapshot output, while in Jest <29.0.0 it is `true` by default.

```ts
import { expect, test } from 'vitest'

test('snapshot', () => {
  const bar = [
    {
      foo: 'bar',
    },
  ]

  // in Jest
  expect(bar).toMatchInlineSnapshot(`
    Array [
      Object {
        "foo": "bar",
      },
    ]
  `)

  // in Vitest
  expect(bar).toMatchInlineSnapshot(`
    [
      {
        "foo": "bar",
      },
    ]
  `)
})
```

We believe this is a more reasonable default for readability and overall DX. If you still prefer Jest's behavior, you can change your config:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    snapshotFormat: {
      printBasicPrototype: true,
    },
  },
})
```

#### 3. Chevron `>` is used as a separator instead of colon `:` for custom messages

Vitest uses chevron `>` as a separator instead of colon `:` for readability, when a custom message is passed during creation of a snapshot file.

For the following example test code:

```js
test('toThrowErrorMatchingSnapshot', () => {
  expect(() => {
    throw new Error('error')
  }).toThrowErrorMatchingSnapshot('hint')
})
```

In Jest, the snapshot will be:

```console
exports[`toThrowErrorMatchingSnapshot: hint 1`] = `"error"`;
```

In Vitest, the equivalent snapshot will be:

```console
exports[`toThrowErrorMatchingSnapshot > hint 1`] = `[Error: error]`;
```

#### 4. default `Error` snapshot is different for `toThrowErrorMatchingSnapshot` and `toThrowErrorMatchingInlineSnapshot`

```js
import { expect, test } from 'vitest'

test('snapshot', () => {
  // in Jest and Vitest
  expect(new Error('error')).toMatchInlineSnapshot(`[Error: error]`)

  // Jest snapshots `Error.message` for `Error` instance
  // Vitest prints the same value as toMatchInlineSnapshot
  expect(() => {
    throw new Error('error')
  }).toThrowErrorMatchingInlineSnapshot(`"error"`) // [!code --]
  }).toThrowErrorMatchingInlineSnapshot(`[Error: error]`) // [!code ++]
})
```
