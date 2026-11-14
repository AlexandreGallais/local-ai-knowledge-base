---
title: "AudioContext: playbackStats property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiocontext/playbackstats/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioContext: playbackStats property

The **`playbackStats`** read-only property of the `AudioContext` interface returns an `AudioPlaybackStats` object providing access to duration, underrun, and latency statistics for the `AudioContext`. These statistics allow you to measure audio delay and glitches.

It is possible to retrieve the immediate playout latency of the context via the `AudioContext.outputLatency` property; `playbackStats`, however, provides access to more detailed statistics that update over time, including average, minimum, and maximum latency.

## Value

An `AudioPlaybackStats` object.

## Examples

### Basic usage

```js
const audioCtx = new AudioContext();
const stats = audioCtx.playbackStats;

// ...

// Log average latency
console.log(stats.averageLatency);
```

See also the main `AudioPlaybackStats` reference page for a more in-depth example.

## See also

- Web Audio API
