---
title: "WorkerGlobalScope: clearTimeout() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/cleartimeout/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: clearTimeout() method

The **`clearTimeout()`** method of the `WorkerGlobalScope` interface cancels a timeout previously established by calling `WorkerGlobalScope.setTimeout()`.

If the parameter provided does not identify a previously established action,
this method does nothing.

## Syntax

```js
clearTimeout(timeoutID)
```

### Parameters

- `timeoutID`
    The identifier of the timeout you want to cancel. This ID was returned by the
    corresponding call to `setTimeout()`.

It's worth noting that the pool of IDs used by `setTimeout()` and `setInterval()` are shared, which means you can technically use `clearTimeout()` and `clearInterval()` interchangeably. However, for clarity, you should avoid doing so.

### Return value

None (`undefined`).

## Examples

See `Window.clearTimeout()` for examples.

## Notes

Passing an invalid ID to `clearTimeout()` silently does nothing; no
exception is thrown.

## See also

- `Window.clearTimeout()`
- `WorkerGlobalScope.setTimeout()`
- `WorkerGlobalScope.clearInterval()`
- `DedicatedWorkerGlobalScope.requestAnimationFrame()`
