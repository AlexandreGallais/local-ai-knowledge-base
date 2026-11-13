---
title: "AbortSignal: throwIfAborted() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/abortsignal/throwifaborted/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AbortSignal: throwIfAborted() method

The **`throwIfAborted()`** method throws the signal's abort `reason` if the signal has been aborted; otherwise it does nothing.

An API that needs to support aborting can accept an `AbortSignal` object and use `throwIfAborted()` to test and throw when the `abort` event is signaled.

This method can also be used to abort operations at particular points in code, rather than passing to functions that take a signal.

## Syntax

```js
throwIfAborted()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

The examples below come from the specification.

### Aborting a polling operation

This example demonstrates how you can use `throwIfAborted()` to abort a polling operation.

Consider an asynchronous `waitForCondition()` function that is called with another asynchronous function `func`, a target value `targetValue`, and an `AbortSignal`.
The method compares the result of `func` with `targetValue` in a loop, returning when they match.

```js
async function waitForCondition(func, targetValue, { signal } = {}) {
  while (true) {
    signal?.throwIfAborted();

    const result = await func();
    if (result === targetValue) {
      return;
    }
  }
}
```

On each iteration of the loop, we use `throwIfAborted()` to throw the signal's `reason` if the operation has been aborted (and otherwise do nothing).
If the signal is aborted, this will cause the `waitForCondition()` promise to be rejected.

## See also

- Fetch API
