---
title: "AudioScheduledSourceNode: start() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioscheduledsourcenode/start/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioScheduledSourceNode: start() method

The `start()` method on `AudioScheduledSourceNode` schedules a sound to begin playback at the specified time.
If no time is specified, then the sound begins playing immediately.

## Syntax

```js
start()
start(when)
```

### Parameters

- `when` (optional)
    The time, in seconds, at which the sound should begin to play. This value is
    specified in the same time coordinate system as the `AudioContext` is
    using for its `currentTime` attribute. A
    value of 0 (or omitting the `when` parameter entirely) causes the sound to
    start playback immediately.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the node has already been started. This error occurs even if the node is no longer
    running because of a prior call to `stop()`.
- `RangeError`
    Thrown if the value specified for `when` is negative.

## Examples

This example demonstrates how to create an `OscillatorNode` which is
scheduled to start playing in 2 seconds and stop playing 1 second after that. The times
are calculated by adding the desired number of seconds to the context's current time
stamp returned by `AudioContext.currentTime`.

```js
context = new AudioContext();
osc = context.createOscillator();
osc.connect(context.destination);

/* Schedule the start and stop times for the oscillator */

osc.start(context.currentTime + 2);
osc.stop(context.currentTime + 3);
```

## See also

- Using the Web Audio API
- `stop()`
- `AudioScheduledSourceNode`
- `AudioBufferSourceNode`
- `ConstantSourceNode`
- `OscillatorNode`
