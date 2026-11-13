---
title: "OfflineAudioContext: suspend() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/offlineaudiocontext/suspend/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OfflineAudioContext: suspend() method

The **`suspend()`** method of the `OfflineAudioContext` interface schedules a suspension of the time
progression in the audio context at the specified time and returns a promise. This is
generally useful at the time of manipulating the audio graph synchronously on
OfflineAudioContext.

Note that the maximum precision of suspension is the size of the render quantum and the
specified suspension time will be rounded down to the nearest render quantum boundary.
For this reason, it is not allowed to schedule multiple suspends at the same quantized
frame. Also scheduling should be done while the context is not running to ensure the
precise suspension.

## Syntax

```js
suspend(suspendTime)
```

### Parameters

- `suspendTime`
    A floating-point number specifying the suspend time, in seconds.

### Return value

A `Promise` resolving to `undefined`.

### Exceptions

The promise is rejected when any exception is encountered.

- `InvalidStateError` `DOMException`
    Returned if the quantized frame number is one of the following:
    - a negative number
    - less than or equal to the current time
    - greater than or equal to the total render duration
    - scheduled by another suspend for the same time
