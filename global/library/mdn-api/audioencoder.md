---
title: "AudioEncoder"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioencoder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioEncoder

The **`AudioEncoder`** interface of the WebCodecs API encodes `AudioData` objects.

## Constructor

- `AudioEncoder()`
    Creates a new `AudioEncoder` object.

## Instance properties

_Inherits properties from its parent, `EventTarget`._

- `AudioEncoder.encodeQueueSize` (read-only)
    An integer representing the number of encode queue requests.
- `AudioEncoder.state` (read-only)
    Represents the state of the underlying codec and whether it is configured for encoding.

## Static methods

- `AudioEncoder.isConfigSupported()`
    Returns a promise indicating whether the provided `AudioEncoderConfig` is supported.

## Instance methods

_Inherits methods from its parent, `EventTarget`._

- `AudioEncoder.configure()`
    Enqueues a control message to configure the audio encoder for encoding chunks.
- `AudioEncoder.encode()`
    Enqueues a control message to encode a given `AudioData` objects.
- `AudioEncoder.flush()`
    Returns a promise that resolves once all pending messages in the queue have been completed.
- `AudioEncoder.reset()`
    Resets all states including configuration, control messages in the control message queue, and all pending callbacks.
- `AudioEncoder.close()`
    Ends all pending work and releases system resources.

## Events

- `dequeue`
    Fires to signal a decrease in `AudioEncoder.encodeQueueSize`.
