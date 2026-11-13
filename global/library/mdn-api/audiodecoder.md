---
title: "AudioDecoder"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiodecoder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioDecoder

The **`AudioDecoder`** interface of the `WebCodecs API` decodes chunks of audio.

## Constructor

- `AudioDecoder()`
    Creates a new `AudioDecoder` object.

## Instance properties

_Inherits properties from its parent, `EventTarget`._

- `AudioDecoder.decodeQueueSize` (read-only)
    An integer representing the number of decode queue requests.
- `AudioDecoder.state` (read-only)
    Represents the state of the underlying codec and whether it is configured for decoding.

## Static methods

- `AudioDecoder.isConfigSupported()`
    Returns a promise indicating whether the provided `AudioDecoderConfig` is supported.

## Instance methods

_Inherits methods from its parent, `EventTarget`._

- `AudioDecoder.configure()`
    Enqueues a control message to configure the audio decoder for decoding chunks.
- `AudioDecoder.decode()`
    Enqueues a control message to decode a given chunk of audio.
- `AudioDecoder.flush()`
    Returns a promise that resolves once all pending messages in the queue have been completed.
- `AudioDecoder.reset()`
    Resets all states including configuration, control messages in the control message queue, and all pending callbacks.
- `AudioDecoder.close()`
    Ends all pending work and releases system resources.

## Events

- `dequeue`
    Fires to signal a decrease in `AudioDecoder.decodeQueueSize`.
