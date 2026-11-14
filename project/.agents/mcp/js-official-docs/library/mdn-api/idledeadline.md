---
title: "IdleDeadline"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idledeadline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IdleDeadline

The `IdleDeadline` interface is used as the data type of the input parameter to idle callbacks established by calling `Window.requestIdleCallback()`. It offers a method, `timeRemaining()`, which lets you determine how much longer the user agent estimates it will remain idle and a property, `didTimeout`, which lets you determine if your callback is executing because its timeout duration expired.

To learn more about how request callbacks work, see Collaborative Scheduling of Background Tasks.

## Instance properties

- `IdleDeadline.didTimeout` (read-only)
    A Boolean whose value is `true` if the callback is being executed because the timeout specified when the idle callback was installed has expired.

## Instance methods

- `IdleDeadline.timeRemaining()`
    Returns a `DOMHighResTimeStamp`, which is a floating-point value providing an estimate of the number of milliseconds remaining in the current idle period. If the idle period is over, the value is 0. Your callback can call this repeatedly to see if there's enough time left to do more work before returning.

## Example

See our complete example in the article Cooperative Scheduling of Background Tasks API.

## See also

- Cooperative Scheduling of Background Tasks API
- `Window.requestIdleCallback()`
- `Window.cancelIdleCallback()`
