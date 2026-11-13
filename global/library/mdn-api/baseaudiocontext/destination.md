---
title: "BaseAudioContext: destination property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/baseaudiocontext/destination/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BaseAudioContext: destination property

The **`destination`** read-only property of the `BaseAudioContext` interface returns an `AudioDestinationNode` representing the final destination of all audio in the context. It often represents an actual audio-rendering device such as your device's speakers.

## Value

An `AudioDestinationNode`.

## Examples

> **Note:**
> For more complete applied examples/information, check out our Voice-change-O-matic demo (see app.js lines 108–193 for relevant code).

```js
const audioCtx = new AudioContext();
// Older webkit/blink browsers require a prefix

const oscillatorNode = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();

oscillatorNode.connect(gainNode);
gainNode.connect(audioCtx.destination);
```

## See also

- Using the Web Audio API
