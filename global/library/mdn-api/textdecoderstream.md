---
title: "TextDecoderStream"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textdecoderstream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextDecoderStream

The **`TextDecoderStream`** interface of the `Encoding API` converts a stream of text in a binary encoding, such as UTF-8 etc., to a stream of strings.
It is the streaming equivalent of `TextDecoder`.
It implements the same shape as a `TransformStream`, allowing it to be used in `ReadableStream.pipeThrough()` and similar methods.

## Constructor

- `TextDecoderStream()`
    Creates a new `TextDecoderStream` object.

## Instance properties

- `TextDecoderStream.encoding` (read-only)
    An encoding.
- `TextDecoderStream.fatal` (read-only)
    A `Boolean` indicating if the error mode is fatal.
- `TextDecoderStream.ignoreBOM` (read-only)
    A `Boolean` indicating whether the byte order mark is ignored.
- `TextDecoderStream.readable` (read-only)
    Returns the `ReadableStream` instance controlled by this object.
- `TextDecoderStream.writable` (read-only)
    Returns the `WritableStream` instance controlled by this object.

## Examples

Examples of streaming structured data and HTML

## See also

- `TextEncoderStream`
- `TextDecoder`
- `TransformStream`
- Streams API Concepts
- Experimenting with the Streams API
- Streaming requests with the fetch API, developer.chrome.com (2020)
