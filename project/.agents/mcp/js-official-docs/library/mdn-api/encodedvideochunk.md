---
title: "EncodedVideoChunk"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/encodedvideochunk/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EncodedVideoChunk

The **`EncodedVideoChunk`** interface of the `WebCodecs API` represents a chunk of encoded video data.

## Constructor

- `EncodedVideoChunk()`
    Creates a new `EncodedVideoChunk` object.

## Instance properties

- `EncodedVideoChunk.type` (read-only)
    Returns a string indicating whether this chunk of data is a key chunk.
- `EncodedVideoChunk.timestamp` (read-only)
    Returns an integer representing the timestamp of the video in microseconds.
- `EncodedVideoChunk.duration` (read-only)
    Returns an integer representing the duration of the video in microseconds.
- `EncodedVideoChunk.byteLength` (read-only)
    Returns an integer representing the length of the video in bytes.

## Instance methods

- `EncodedVideoChunk.copyTo()`
    Copies the encoded video data.
