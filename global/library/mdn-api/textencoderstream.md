---
title: "TextEncoderStream"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textencoderstream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextEncoderStream

The **`TextEncoderStream`** interface of the `Encoding API` converts a stream of strings into bytes in the UTF-8 encoding. It is the streaming equivalent of `TextEncoder`.
It implements the same shape as a `TransformStream`, allowing it to be used in `ReadableStream.pipeThrough()` and similar methods.

## Constructor

- `TextEncoderStream()`
    Creates a new `TextEncoderStream` object.

## Instance properties

- `TextEncoderStream.encoding` (read-only)
    Always returns `"utf-8"`.
- `TextEncoderStream.readable` (read-only)
    Returns the `ReadableStream` instance controlled by this object.
- `TextEncoderStream.writable` (read-only)
    Returns the `WritableStream` instance controlled by this object.

## Examples

Examples of streaming structured data and HTML

## See also

- `TextDecoderStream`
- `TextEncoder`
- `TransformStream`
- Streams API Concepts
- Experimenting with the Streams API
- Streaming requests with the fetch API, developer.chrome.com (2020)
