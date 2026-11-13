---
title: "Cancellable Test Resources | Recipes"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/recipes/cancellable.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Cancellable Test Resources

A test can hold onto resources that don't stop when the test stops. A `fetch`, a child process, a file stream, a polling loop: none of those notice when Vitest has cancelled the test, and the worker has to sit there waiting for them to finish on their own. Vitest cancels a test when it exceeds its `timeout`, when another test fails under `--bail`, or when someone presses `Ctrl`+`C` in the terminal.

The test context provides a `signal` <Version>3.2.0</Version> that fires in all of those cases. Pass it to anything that accepts an `AbortSignal` and the resource is released when Vitest cancels.

## Pattern

```ts
import { test } from 'vitest'

test('stop request when test times out', async ({ signal }) => {
  await fetch('/heavy-resource', { signal })
}, 2000)
```

If the request hasn't completed within 2 seconds, `fetch` rejects with `AbortError` instead of the test hanging until the operation finishes.

## Other Web APIs that accept an `AbortSignal`

- `fetch`
- `addEventListener`, where passing `{ signal }` removes the listener on abort
- `ReadableStream.pipeTo`
- Node.js APIs like `fs.readFile`, `child_process.spawn`, and `setTimeout` or `setInterval`, all of which accept `{ signal }`
- Any custom code that calls `signal.throwIfAborted()` or listens for `'abort'`

## Forwarding the signal

Wire the test's signal into your own helpers so cancellation propagates all the way down:

```ts
async function pollUntilReady(url: string, signal: AbortSignal) {
  while (!signal.aborted) {
    const res = await fetch(url, { signal })
    if (res.ok) {
      return
    }
    await new Promise(r => setTimeout(r, 200))
  }
  signal.throwIfAborted()
}

test('worker becomes ready', async ({ signal }) => {
  await pollUntilReady('http://localhost:4000/health', signal)
}, 5000)
```

## See also

- `signal` in Test Context
- `bail`
- `testTimeout`
