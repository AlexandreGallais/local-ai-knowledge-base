---
title: "AbortSignal: any() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/abortsignal/any_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AbortSignal: any() static method

The **`AbortSignal.any()`** static method takes an iterable of abort signals and returns an `AbortSignal`. The returned abort signal is aborted when any of the input iterable abort signals are aborted. The `abort reason` will be set to the reason of the first signal that is aborted. If any of the given abort signals are already aborted then so will be the returned `AbortSignal`.

## Syntax

```js
AbortSignal.any(iterable)
```

### Parameters

- `iterable`
    An iterable (such as an `Array`) of abort signals.

### Return value

An `AbortSignal` that is:

- **Already aborted**, if any of the abort signals given is already aborted. The returned `AbortSignal`'s reason will be already set to the `reason` of the first abort signal that was already aborted.
- **Asynchronously aborted**, when any abort signal in `iterable` aborts. The `reason` will be set to the reason of the first abort signal that is aborted.

## Description

`AbortSignal.any()` does not provide a method to unsubscribe the returned signal from its input signals. Aborting the returned signal does not abort the other input signals or cancel their timeouts.

Internally, the combined signal and its source signals are linked through weak references. The combined signals aren't inherently blocked from garbage collection while the input signals remain active. However, a non-aborted combined signal is kept alive while it still has source signals and either registered `abort` event listeners or internal abort steps registered by an API.

If your code adds `abort` listeners to the combined signal, remove them when the operation finishes, just as you would for any other `AbortSignal`.

## Examples

### Using `AbortSignal.any()`

This example demonstrates combining both a signal from an `AbortController`, and a timeout signal from `AbortSignal.timeout`.

```js
const cancelDownloadButton = document.getElementById("cancelDownloadButton");

const userCancelController = new AbortController();

cancelDownloadButton.addEventListener("click", () => {
  userCancelController.abort();
});

// Timeout after 5 minutes
const timeoutSignal = AbortSignal.timeout(1_000 * 60 * 5);

// This signal will abort when either the user clicks the cancel button or 5 minutes is up
// whichever is sooner
const combinedSignal = AbortSignal.any([
  userCancelController.signal,
  timeoutSignal,
]);

try {
  const res = await fetch(someUrlToDownload, {
    // Stop the fetch when any of the signals aborts
    signal: combinedSignal,
  });
  const body = await res.blob();
  // Do something with downloaded content:
  // …
} catch (e) {
  if (e.name === "AbortError") {
    // Canceled by the user
  } else if (e.name === "TimeoutError") {
    // Show user that download timed out
  } else {
    // Other error, e.g. network error
  }
}
```
