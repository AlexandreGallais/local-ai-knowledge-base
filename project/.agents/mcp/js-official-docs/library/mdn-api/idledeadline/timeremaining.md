---
title: "IdleDeadline: timeRemaining() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idledeadline/timeremaining/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IdleDeadline: timeRemaining() method

The **`timeRemaining()`** method
of the `IdleDeadline` interface returns the estimated number of
milliseconds the user agent will remain idle for. The callback can call this method at
any time to determine how much time it can continue to work before it must return. For
example, if the callback finishes a task and has another one to begin, it can call
`timeRemaining()` to see if there's enough time to complete the next task. If
there isn't, the callback can just return immediately, or look for other work to do with
the remaining time.

By the time `timeRemaining()` reaches `0`, it is suggested that the callback
should return control to the user agent's event loop.

> **Note:**
> The value returned by `timeRemaining()` is an estimate of how much time the user agent believes is available before the next latency-critical task needs to run. This estimate is not fixed and can suddenly drop to 0 if higher-priority work arrives. For example, the browser's estimate can change in the middle of an idle callback if the user clicks. Developers should not assume the value always decreases linearly like a countdown timer.

## Syntax

```js
timeRemaining()
```

### Parameters

None.

### Return value

A `DOMHighResTimeStamp` value (which is a floating-point number)
representing the number of milliseconds the user agent estimates are left in the current
idle period. The value is ideally accurate to within about 5 microseconds.

If the `IdleDeadline` object's `didTimeout`
property is true, this method returns zero.

## Examples

See our complete example
in the article Cooperative Scheduling of Background Tasks API.

## See also

- Collaborative Scheduling of Background Tasks
- `IdleDeadline`
- `Window.requestIdleCallback()`
- `Window.cancelIdleCallback()`
