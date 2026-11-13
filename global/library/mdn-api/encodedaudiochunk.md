---
title: "EncodedAudioChunk"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/encodedaudiochunk/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EncodedAudioChunk

The **`EncodedAudioChunk`** interface of the `WebCodecs API` represents a chunk of encoded audio data.

## Constructor

- `EncodedAudioChunk()`
    Creates a new `EncodedAudioChunk` object.

## Instance properties

- `EncodedAudioChunk.type` (read-only)
    Returns a string indicating whether this chunk of data is a key chunk.
- `EncodedAudioChunk.timestamp` (read-only)
    Returns an integer representing the timestamp of the audio in microseconds.
- `EncodedAudioChunk.duration` (read-only)
    Returns an integer representing the duration of the audio in microseconds.
- `EncodedAudioChunk.byteLength` (read-only)
    Returns an integer representing the length of the audio in bytes.

## Instance methods

- `EncodedAudioChunk.copyTo()`
    Copies the encoded audio data.
