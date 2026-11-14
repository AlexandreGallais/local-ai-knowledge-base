---
title: "AudioPlaybackStats: underrunDuration property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioplaybackstats/underrunduration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioPlaybackStats: underrunDuration property

The **`underrunDuration`** read-only property of the `AudioPlaybackStats` interface is a number indicating the total duration of the underrun events that have occurred since the audio context was initialized.

## Value

A double-precision floating point number indicating the duration of underrun events, in seconds. Initialized to `0`.

## Examples

### Basic usage

```js
const audioCtx = new AudioContext();
const stats = audioCtx.playbackStats;

// ...

// Log total duration of underrun events
console.log(stats.underrunDuration);
```

See also the main `AudioPlaybackStats` reference page for a more in-depth example.

## See also

- Web Audio API
