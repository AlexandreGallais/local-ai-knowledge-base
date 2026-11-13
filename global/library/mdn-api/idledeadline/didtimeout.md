---
title: "IdleDeadline: didTimeout property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idledeadline/didtimeout/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IdleDeadline: didTimeout property

The read-only **`didTimeout`** property on the
**`IdleDeadline`** interface is a Boolean value which
indicates whether or not the idle callback is being invoked because the timeout interval
specified when `Window.requestIdleCallback()` was called has expired.

If `didTimeout` is `true`, the `IdleDeadline` object's
`timeRemaining()` method will return
approximately 0.

Idle callbacks support the concept of a timeout in order to ensure that whatever task
they're meant to perform actually happens, even if the user agent never has enough idle
time available. Your callback will typically check the value of `didTimeout`
if it needs to perform an action even if the browser is too busy to grant you the time;
you should react by performing the needed task or, ideally, a minimal amount of work
that can be done to keep things moving along, then schedule a new callback to try again
to get the rest of the work done.

## Value

A Boolean which is `true` if the callback is running due to the callback's
timeout period elapsing or `false` if the callback is running because the
user agent is idle and is offering time to the callback.

## Examples

See our complete example
in the article Cooperative Scheduling of Background Tasks API.

## See also

- Collaborative Scheduling of Background Tasks
- `IdleDeadline`
- `Window.requestIdleCallback()`
- `Window.cancelIdleCallback()`
