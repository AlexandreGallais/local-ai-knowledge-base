---
title: "WebTransportReceiveStream"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportreceivestream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportReceiveStream

The `WebTransportReceiveStream` interface of the `WebTransport API` is a `ReadableStream` that can be used to read from an incoming unidirectional or bidirectional `WebTransport` stream.

The stream is a readable byte stream of `Uint8Array`, and can be consumed using either a BYOB reader (`ReadableStreamBYOBReader`) or the default reader (`ReadableStreamDefaultReader`).

Objects of this type are not constructed directly.
Instead they are obtained using the `WebTransport.incomingUnidirectionalStream` property.

`WebTransportReceiveStream` is a transferable object.

## Instance properties

_Inherits properties from its parent interface, `ReadableStream`._

## Instance methods

_Also inherits properties from its parent interface, `ReadableStream`._

- `WebTransportReceiveStream.getStats()`
    Returns a `Promise` that resolves with statistics related to this stream.

## Examples

See `WebTransport.incomingUnidirectionalStreams` for an example of how to get a `ReadableStream` of `WebTransportReceiveStream` objects.

## See also

- Using WebTransport
- `Streams API`
- WebTransport over HTTP/3
