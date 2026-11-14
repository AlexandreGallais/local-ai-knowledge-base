---
title: "AudioScheduledSourceNode: stop() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioscheduledsourcenode/stop/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioScheduledSourceNode: stop() method

The `stop()` method on `AudioScheduledSourceNode` schedules a
sound to cease playback at the specified time. If no time is specified, then the sound
stops playing immediately.

Each time you call `stop()` on the same node, the specified time replaces
any previously-scheduled stop time that hasn't occurred yet. If the node has already
stopped, this method has no effect.

> **Note:**
> If a scheduled stop time occurs before the node's scheduled
> start time, the node never starts to play.

## Syntax

```js
stop()
stop(when)
```

### Parameters

- `when` (optional)
    The time, in seconds, at which the sound should stop playing. This value is
    specified in the same time coordinate system as the `AudioContext` is
    using for its `currentTime` attribute.
    Omitting this parameter or specifying a value of 0 causes
    the sound to stop playback immediately.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the node has not been started by calling `start()`.
- `RangeError`
    Thrown if the value specified for `when` is negative.

## Examples

This example demonstrates starting an oscillator node, scheduled to begin playing at
once and to stop playing in one second. The stop time is determined by taking the audio
context's current time from `AudioContext.currentTime` and adding 1 second.

```js
context = new AudioContext();
osc = context.createOscillator();
osc.connect(context.destination);

/* Let's play a sine wave for one second. */

osc.start();
osc.stop(context.currentTime + 1);
```

## See also

- Using the Web Audio API
- `start()`
- `AudioScheduledSourceNode`
- `AudioBufferSourceNode`
- `ConstantSourceNode`
- `OscillatorNode`
