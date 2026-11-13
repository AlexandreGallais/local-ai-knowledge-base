---
title: "Window: requestIdleCallback() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/requestidlecallback/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: requestIdleCallback() method

The **`window.requestIdleCallback()`** method queues a function
to be called during a browser's idle periods. This enables developers to perform
background and low priority work on the main thread, without impacting
latency-critical events such as animation and input response. Functions are generally
called in first-in-first-out order; however, callbacks which have a `timeout`
specified may be called out-of-order if necessary in order to run them before the
timeout elapses.

You can call `requestIdleCallback()` within an idle callback function to
schedule another callback to take place no sooner than the next pass <example-value> the event
loop.

> **Note:**
> A `timeout` option is strongly recommended for required work,
> as otherwise it's possible multiple seconds will elapse before the callback is fired.

## Syntax

```js
requestIdleCallback(callback)
requestIdleCallback(callback, options)
```

### Parameters

- `callback`
    A reference to a function that should be called in the near future, when the event
    loop is idle. The callback function is passed an `IdleDeadline` object
    describing the amount of time available and whether or not the callback has been run
    because the timeout period expired.
- `options` (optional)
    Contains optional configuration parameters. Currently only one property is defined:
    - `timeout`
        If the number of milliseconds represented by this parameter has elapsed and the callback has not already been called, then a task to execute the callback is queued in the event loop (even if doing so risks causing a negative performance impact). `timeout` must be a positive value or it is ignored.

### Return value

An ID which can be used to cancel the callback by passing it into the
`window.cancelIdleCallback()` method.

## Examples

See our complete example
in the article Cooperative Scheduling of Background Tasks API.

## See also

- `Window.cancelIdleCallback()`
- `IdleDeadline`
- `Window.setTimeout()`
- `Window.setInterval()`
- `Window.requestAnimationFrame()`
