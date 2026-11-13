---
title: "VideoDecoder"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videodecoder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoDecoder

The **`VideoDecoder`** interface of the `WebCodecs API` decodes chunks of video.

## Constructor

- `VideoDecoder()`
    Creates a new `VideoDecoder` object.

## Instance properties

_Inherits properties from its parent, `EventTarget`._

- `VideoDecoder.decodeQueueSize` (read-only)
    An integer representing the number of queued decode requests.
- `VideoDecoder.state` (read-only)
    Indicates the current state of decoder. Possible values are:
    - `"unconfigured"`
    - `"configured"`
    - `"closed"`

## Static methods

- `VideoDecoder.isConfigSupported()`
    Returns a promise indicating whether the provided `VideoDecoderConfig` is supported.

## Instance methods

_Inherits methods from its parent, `EventTarget`._

- `VideoDecoder.configure()`
    Enqueues a control message to configure the video decoder for decoding chunks.
- `VideoDecoder.decode()`
    Enqueues a control message to decode a given chunk of video.
- `VideoDecoder.flush()`
    Returns a promise that resolves once all pending messages in the queue have been completed.
- `VideoDecoder.reset()`
    Resets all states including configuration, control messages in the control message queue, and all pending callbacks.
- `VideoDecoder.close()`
    Ends all pending work and releases system resources.

## Events

- `dequeue`
    Fires to signal a decrease in `VideoDecoder.decodeQueueSize`.

## See also

- Video processing with WebCodecs
- WebCodecs API Samples
