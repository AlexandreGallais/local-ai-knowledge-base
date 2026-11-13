---
title: "AudioScheduledSourceNode"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioscheduledsourcenode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioScheduledSourceNode

The `AudioScheduledSourceNode` interface—part of the Web Audio API—is a parent interface for several types of audio source node interfaces which share the ability to be started and stopped, optionally at specified times. Specifically, this interface defines the `start()` and `stop()` methods, as well as the `ended` event.

> **Note:**
> You can't create an `AudioScheduledSourceNode` object directly. Instead, use an interface which extends it, such as `AudioBufferSourceNode`, `OscillatorNode` or `ConstantSourceNode`.

Unless stated otherwise, nodes based upon `AudioScheduledSourceNode` output silence when not playing (that is, before `start()` is called and after `stop()` is called). Silence is represented, as always, by a stream of samples with the value zero (0).

## Instance properties

_Inherits properties from its parent interface, `AudioNode`._

## Instance methods

_Inherits methods from its parent interface, `AudioNode`, and adds the following methods:_

- `start()`
    Schedules the node to begin playing the constant sound at the specified time. If no time is specified, the node begins playing immediately.
- `stop()`
    Schedules the node to stop playing at the specified time. If no time is specified, the node stops playing at once.

## Events

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface:

- `ended`
    Fired when the source node has stopped playing, either because it's reached a predetermined stop time, the full duration of the audio has been performed, or because the entire buffer has been played.

## See also

- Using the Web Audio API
- `AudioNode`
