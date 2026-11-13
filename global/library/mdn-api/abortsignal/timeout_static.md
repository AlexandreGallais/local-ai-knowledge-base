---
title: "AbortSignal: timeout() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/abortsignal/timeout_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AbortSignal: timeout() static method

The **`AbortSignal.timeout()`** static method returns an `AbortSignal` that will automatically abort after a specified time.

The signal aborts with a `TimeoutError` `DOMException` on timeout.

The timeout is based on active rather than elapsed time, and will effectively be paused if the code is running in a suspended worker, or while the document is in a back-forward cache ("bfcache").

To combine multiple signals, you can use `AbortSignal.any()`, for example, to directly abort a download using either a timeout signal or by calling `AbortController.abort()`.

## Syntax

```js
AbortSignal.timeout(time)
```

### Parameters

- `time`
    The "active" time in milliseconds before the returned `AbortSignal` will abort.
    The value must be within range of 0 and `Number.MAX_SAFE_INTEGER`.

### Return value

An `AbortSignal`.

The signal will abort with its `AbortSignal.reason` property set to a `TimeoutError` `DOMException` on timeout.

## Description

`AbortSignal.timeout()` does not provide a way to cancel its timeout. Finishing the operation early, or aborting another signal combined with it through `AbortSignal.any()`, does not cancel the timeout.

While the timeout is pending, the signal is kept alive if it has `abort` event listeners. Remove listeners added by your code when they are no longer needed, rather than waiting for the timeout to expire. Creating long timeouts with listeners can prevent garbage collection even after application code drops its references to the signal.

The `AbortSignal` becoming unreachable is not guaranteed to cancel the timeout. If resources are constrained and you want to definitively cancel timeouts early, use an `AbortController` with `setTimeout()` instead, and call `clearTimeout()` when the operation finishes.

## Examples

Below is an example showing a fetch operation that will timeout if unsuccessful after 5 seconds.
Note that this may also fail if the method is not supported, if a browser "stop" button is pressed, or for another reason.

```js
const url = "https://path_to_large_file.mp4";

try {
  const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
  const result = await res.blob();
  // …
} catch (err) {
  if (err.name === "TimeoutError") {
    // This exception is from the abort signal
    console.error("Timeout: It took more than 5 seconds to get the result!");
  } else if (err.name === "AbortError") {
    // This exception is from the fetch itself
    console.error(
      "Fetch aborted by user action (browser stop button, closing tab, etc.",
    );
  } else if (err.name === "TypeError") {
    console.error("AbortSignal.timeout() method is not supported");
  } else {
    // A network error, or some other problem.
    console.error(`Error: type: ${err.name}, message: ${err.message}`);
  }
}
```
