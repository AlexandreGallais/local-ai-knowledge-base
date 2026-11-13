---
title: "AudioContext: outputLatency property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiocontext/outputlatency/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioContext: outputLatency property

The **`outputLatency`** read-only property of
the `AudioContext` Interface provides an estimation of the output latency
of the current audio context.

This is the time, in seconds, between the browser passing an audio buffer out of an
audio graph over to the host system's audio subsystem to play, and the time at which the
first sample in the buffer is actually processed by the audio output device.

It varies depending on the platform and the available hardware.

## Value

A double representing the output latency in seconds.

## Examples

```js
const audioCtx = new AudioContext();
console.log(audioCtx.outputLatency);
```

## See also

- Using the Web Audio API
- Web Audio API
