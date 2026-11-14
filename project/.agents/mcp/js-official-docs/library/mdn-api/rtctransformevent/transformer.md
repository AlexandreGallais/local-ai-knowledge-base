---
title: "RTCTransformEvent: transformer property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtctransformevent/transformer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCTransformEvent: transformer property

The read-only **`transformer`** property of the `RTCTransformEvent` interface returns the `RTCRtpScriptTransformer` associated with the event.

The property exposes the WebRTC sender or receiver pipeline as a readable and writable stream of encoded media frames, which a WebRTC Encoded Transform can insert itself into in order to modify frames.

## Value

A `RTCRtpScriptTransformer`.

## See also

- Using WebRTC Encoded Transforms
