---
title: "WebTransportDatagramDuplexStream: readable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportdatagramduplexstream/readable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportDatagramDuplexStream: readable property

The **`readable`** read-only property of the `WebTransportDatagramDuplexStream` interface returns a `ReadableStream` instance that can be used to unreliably read incoming datagrams from the stream.

"Unreliably" means that transmission of data is not guaranteed, nor is arrival in a specific order.
This is fine in some situations and provides very fast delivery.
For example, you might want to transmit regular game state updates where each message supersedes the last one that arrives, and order is not important.

## Value

A `ReadableStream`.

By default, this is a readable stream in which each chunk is a `Uint8Array` containing one datagram.
If the `WebTransport` was constructed with the `datagramsReadableType` option set to `bytes`, this is a readable byte stream.
A readable byte stream can also be read using a `ReadableStreamBYOBReader`, which reads each datagram into a buffer that you supply.
See the Reading datagrams with a BYOB reader example on the `WebTransport()` constructor page.

## Examples

See the main `WebTransportDatagramDuplexStream` interface page.

## See also

- Using WebTransport
- `WebSockets API`
- `Streams API`
- WebTransport over HTTP/3
