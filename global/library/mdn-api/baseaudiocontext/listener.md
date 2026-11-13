---
title: "BaseAudioContext: listener property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/baseaudiocontext/listener/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BaseAudioContext: listener property

The **`listener`** read-only property of the `BaseAudioContext` interface returns an `AudioListener` object that can then be used for implementing 3D audio spatialization.

## Value

An `AudioListener` object.

## Examples

> **Note:**
> For a full Web Audio spatialization example, see our panner-node demo.

```js
const audioCtx = new AudioContext();
// Older webkit/blink browsers require a prefix

// …

const myListener = audioCtx.listener;
```

## See also

- Using the Web Audio API
