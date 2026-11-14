---
title: "WorkerGlobalScope: clearInterval() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/clearinterval/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: clearInterval() method

The **`clearInterval()`** method of the `WorkerGlobalScope` interface cancels a timed, repeating action which was previously established by a call to `setInterval()`. If the parameter provided does not identify a previously established action, this method does nothing.

## Syntax

```js
clearInterval(intervalID)
```

### Parameters

- `intervalID`
    The identifier of the repeated action you want to cancel. This ID was returned by
    the corresponding call to `setInterval()`.

It's worth noting that the pool of IDs used by
`setInterval()` and
`setTimeout()` are shared, which
means you can technically use `clearInterval()` and
`clearTimeout()` interchangeably.
However, for clarity, you should avoid doing so.

### Return value

None (`undefined`).

## Examples

See `setInterval()` for examples.

## See also

- `Window.clearInterval()`
- `WorkerGlobalScope.setInterval()`
- `WorkerGlobalScope.clearTimeout()`
- `DedicatedWorkerGlobalScope.cancelAnimationFrame()`
