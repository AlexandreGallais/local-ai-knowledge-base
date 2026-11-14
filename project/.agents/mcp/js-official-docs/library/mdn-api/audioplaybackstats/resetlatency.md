---
title: "AudioPlaybackStats: resetLatency() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioplaybackstats/resetlatency/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioPlaybackStats: resetLatency() method

The **`resetLatency()`** method of the `AudioPlaybackStats` interface resets the start of the interval during which latency statistics are measured to the `BaseAudioContext.currentTime`.

## Syntax

```js
resetLatency()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Basic usage

```js
const audioCtx = new AudioContext();
const stats = audioCtx.playbackStats;

// ...

// Reset the latency measurement to the current time
stats.resetLatency();
```

See also the main `AudioPlaybackStats` reference page for a more in-depth example.

## See also

- Web Audio API
