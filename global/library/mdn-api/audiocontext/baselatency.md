---
title: "AudioContext: baseLatency property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiocontext/baselatency/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioContext: baseLatency property

The **`baseLatency`** read-only property of the
`AudioContext` interface returns a double that represents the number of
seconds of processing latency incurred by the `AudioContext` passing an audio
buffer from the `AudioDestinationNode` — i.e., the end of the audio graph —
into the host system's audio subsystem ready for playing.

> **Note:**
> You can request a certain latency during
> `construction time` with the
> `latencyHint` option, but the browser may ignore the option.

## Value

A double representing the base latency in seconds.

## Examples

```js
// default latency ("interactive")
const audioCtx1 = new AudioContext();
console.log(audioCtx1.baseLatency); // 0.00

// higher latency ("playback")
const audioCtx2 = new AudioContext({ latencyHint: "playback" });
console.log(audioCtx2.baseLatency); // 0.15
```

## See also

- Using the Web Audio API
- Web Audio API
