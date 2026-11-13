---
title: "AudioPlaybackStats: minimumLatency property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioplaybackstats/minimumlatency/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioPlaybackStats: minimumLatency property

The **`minimumLatency`** read-only property of the `AudioPlaybackStats` interface is a number indicating the minimum latency since the audio context was initialized or since `AudioPlaybackStats.resetLatency()` was last called.

## Value

A double-precision floating point number indicating the minimum latency, in seconds. Initialized to `0`.

## Examples

### Basic usage

```js
const audioCtx = new AudioContext();
const stats = audioCtx.playbackStats;

// ...

// Log minimum latency
console.log(stats.minimumLatency);
```

See also the main `AudioPlaybackStats` reference page for a more in-depth example.

## See also

- Web Audio API
