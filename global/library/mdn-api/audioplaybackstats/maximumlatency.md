---
title: "AudioPlaybackStats: maximumLatency property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioplaybackstats/maximumlatency/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioPlaybackStats: maximumLatency property

The **`maximumLatency`** read-only property of the `AudioPlaybackStats` interface is a number indicating the maximum latency since the audio context was initialized or since `AudioPlaybackStats.resetLatency()` was last called.

## Value

A double-precision floating point number indicating the maximum latency, in seconds. Initialized to `0`.

## Examples

### Basic usage

```js
const audioCtx = new AudioContext();
const stats = audioCtx.playbackStats;

// ...

// Log maximum latency
console.log(stats.maximumLatency);
```

See also the main `AudioPlaybackStats` reference page for a more in-depth example.

## See also

- Web Audio API
