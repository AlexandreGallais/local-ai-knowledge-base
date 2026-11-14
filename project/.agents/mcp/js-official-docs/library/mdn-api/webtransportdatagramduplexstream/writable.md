---
title: "WebTransportDatagramDuplexStream: writable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportdatagramduplexstream/writable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportDatagramDuplexStream: writable property

The **`writable`** read-only property of the `WebTransportDatagramDuplexStream` interface returns a `WritableStream` instance that can be used to unreliably write outgoing datagrams to the stream.

"Unreliably" means that transmission of data is not guaranteed, nor is arrival in a specific order. This is fine in some situations and provides very fast delivery. For example, you might want to transmit regular game state updates where each message supersedes the last one that arrives, and order is not important.

`createWritable()` should be used by preference.

## Value

A `WritableStream`.

## Examples

See the main `WebTransportDatagramDuplexStream` interface page.

## Specifications

This feature has been removed from the specification.

## See also

- Using WebTransport
- `WebSockets API`
- `Streams API`
- WebTransport over HTTP/3
