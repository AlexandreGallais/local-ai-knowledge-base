---
title: "Test Context | Guide (part 1 of 3)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/test-context.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Test Context

Inspired by Playwright Fixtures, Vitest's test context allows you to define utils, states, and fixtures that can be used in your tests.

## Usage

The first argument for each test callback is a test context.

```ts
import { it } from 'vitest'

it('should work', ({ task }) => {
  // prints name of the test
  console.log(task.name)
})
```

## Built-in Test Context

### `task`

A readonly object containing metadata about the test.

### `expect`

The `expect` API bound to the current test:

```ts
import { it } from 'vitest'

it('math is easy', ({ expect }) => {
  expect(2 + 2).toBe(4)
})
```

This API is useful for running snapshot tests concurrently because global expect cannot track them:

```ts
import { it } from 'vitest'

it.concurrent('math is easy', ({ expect }) => {
  expect(2 + 2).toMatchInlineSnapshot()
})

it.concurrent('math is hard', ({ expect }) => {
  expect(2 * 2).toMatchInlineSnapshot()
})
```

### `skip`

```ts
function skip(note?: string): never
function skip(condition: boolean, note?: string): void
```

Skips subsequent test execution and marks test as skipped:

```ts
import { expect, it } from 'vitest'

it('math is hard', ({ skip }) => {
  skip()
  expect(2 + 2).toBe(5)
})
```

Since Vitest 3.1, it accepts a boolean parameter to skip the test conditionally:

```ts
it('math is hard', ({ skip, mind }) => {
  skip(mind === 'foggy')
  expect(2 + 2).toBe(5)
})
```

### `annotate` <Version>3.2.0</Version> {#annotate}

```ts
function annotate(
  message: string,
  attachment?: TestAttachment,
): Promise<TestAnnotation>

function annotate(
  message: string,
  type?: string,
  attachment?: TestAttachment,
): Promise<TestAnnotation>
```

Add a test annotation that will be displayed by your reporter.

```ts
test('annotations API', async ({ annotate }) => {
  await annotate('https://github.com/vitest-dev/vitest/pull/7953', 'issues')
})
```

### `signal` <Version>3.2.0</Version> {#signal}

An `AbortSignal` that can be aborted by Vitest. The signal is aborted in these situations:

- Test times out
- User manually cancelled the test run with Ctrl+C
- `vitest.cancelCurrentRun` was called programmatically
- Another test failed in parallel and the `bail` flag is set

```ts
it('stop request when test times out', async ({ signal }) => {
  await fetch('/resource', { signal })
}, 2000)
```

### `bench` <Version>5.0.0</Version> {#bench}

The `bench` fixture lets you define and run benchmarks inside regular tests. You can measure throughput, compare implementations, and assert relative performance:

```ts
import { expect, test } from 'vitest'

test('compare parsers', async ({ bench }) => {
  const result = await bench.compare(
    bench('JSON.parse', () => {
      JSON.parse('{"key":"value"}')
    }),
    bench('custom parser', () => {
      customParse('{"key":"value"}')
    }),
  )

  expect(result.get('JSON.parse')).toBeFasterThan(result.get('custom parser'))
})
```

See the Benchmarks guide for full documentation on comparisons, baselines, and assertion matchers.

### `onTestFailed`

The `onTestFailed` hook bound to the current test. This API is useful if you are running tests concurrently and need to have a special handling only for this specific test.

### `onTestFinished`

The `onTestFinished` hook bound to the current test. This API is useful if you are running tests concurrently and need to have a special handling only for this specific test.
