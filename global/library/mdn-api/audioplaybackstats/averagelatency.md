---
title: "AudioPlaybackStats: averageLatency property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioplaybackstats/averagelatency/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioPlaybackStats: averageLatency property

The **`averageLatency`** read-only property of the `AudioPlaybackStats` interface is a number indicating the average latency since the audio context was initialized or since `AudioPlaybackStats.resetLatency()` was last called.

## Value

A double-precision floating point number indicating the average latency, in seconds.

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
