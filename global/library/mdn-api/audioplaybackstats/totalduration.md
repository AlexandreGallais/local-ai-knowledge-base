---
title: "AudioPlaybackStats: totalDuration property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioplaybackstats/totalduration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioPlaybackStats: totalDuration property

The **`totalDuration`** read-only property of the `AudioPlaybackStats` interface is a number indicating the total duration of all audio frames since the audio context was initialized.

## Value

A double-precision floating point number indicating the total duration of all audio frames, in seconds. Initialized to `0`.

## Examples

### Basic usage

```js
const audioCtx = new AudioContext();
const stats = audioCtx.playbackStats;

// ...

// Log total duration
console.log(stats.totalDuration);
```

See also the main `AudioPlaybackStats` reference page for a more in-depth example.

## See also

- Web Audio API
