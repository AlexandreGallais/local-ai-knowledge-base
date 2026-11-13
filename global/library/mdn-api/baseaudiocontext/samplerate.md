---
title: "BaseAudioContext: sampleRate property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/baseaudiocontext/samplerate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BaseAudioContext: sampleRate property

The **`sampleRate`** read-only property of the `BaseAudioContext` interface returns a floating point number representing the sample rate, in samples per second, used by all nodes in this audio context.
This limitation means that sample-rate converters are not supported.

## Value

A floating point number indicating the audio context's sample rate, in samples per
second.

## Examples

> **Note:**
> For a full Web Audio example implementation, see one of our
> Web Audio Demos on the MDN GitHub repo. Try entering
> `audioCtx.sampleRate` into your browser console.

```js
const audioCtx = new AudioContext();
// Older webkit/blink browsers require a prefix

// …

console.log(audioCtx.sampleRate);
```

## See also

- Using the Web Audio API
