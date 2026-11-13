---
title: "VideoEncoder"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videoencoder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoEncoder

The **`VideoEncoder`** interface of the `WebCodecs API` encodes `VideoFrame` objects into `EncodedVideoChunk`s.

## Constructor

- `VideoEncoder()`
    Creates a new `VideoEncoder` object.

## Instance properties

_Inherits properties from its parent, `EventTarget`._

- `VideoEncoder.encodeQueueSize` (read-only)
    An integer representing the number of encode queue requests.
- `VideoEncoder.state` (read-only)
    Represents the state of the underlying codec and whether it is configured for encoding.

## Static methods

- `VideoEncoder.isConfigSupported()`
    Returns a promise indicating whether the provided `VideoEncoderConfig` is supported.

## Instance methods

_Inherits methods from its parent, `EventTarget`._

- `VideoEncoder.configure()`
    Asynchronously prepares the encoder to accept video frames for encoding with the specified parameters.
- `VideoEncoder.encode()`
    Asynchronously encodes a `VideoFrame`.
- `VideoEncoder.flush()`
    Returns a promise that resolves once all pending encodes have been completed.
- `VideoEncoder.reset()`
    Cancels all pending encodes and callbacks.
- `VideoEncoder.close()`
    Ends all pending work and releases system resources.

## Events

- `dequeue`
    Fires to signal a decrease in `VideoEncoder.encodeQueueSize`.

## See also

Video processing with WebCodecs
