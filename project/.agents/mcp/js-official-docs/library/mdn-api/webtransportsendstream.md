---
title: "WebTransportSendStream"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportsendstream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportSendStream

The `WebTransportSendStream` interface of the `WebTransport API` is a specialized `WritableStream` that is used to send outbound data in both unidirectional or bidirectional `WebTransport` streams.

The send stream is a writable stream of `Uint8Array`, that can be written to in order to send data to a server.
It additionally provides streaming features such as setting the send order, and getting stream statistics.

Objects of this type are not constructed directly.
When creating a unidirectional stream the `WebTransport.createUnidirectionalStream()` returns an object of this type for sending data.
When creating a bidirectional stream using `WebTransport.createBidirectionalStream()`, the method returns a `WebTransportBidirectionalStream`, and the send stream object can be obtained from its `writable` property.
When a bidirectional stream is initiated by the remote end, an object of this type can similarly be obtained using `WebTransport.incomingBidirectionalStreams`.

`WebTransportSendStream` is a transferable object.

## Instance properties

_Also inherits properties from its parent interface, `WritableStream`._

- `WebTransportSendStream.sendGroup`
    The `WebTransportSendGroup` that this stream is grouped under for the purposes of `sendOrder` prioritization.
- `WebTransportSendStream.sendOrder`
    Indicates the send priority of this stream relative to other streams for which the value has been set.

## Instance methods

_Also inherits methods from its parent interface, `WritableStream`._

- `WebTransportSendStream.getStats()`
    Returns a `Promise` that resolves with statistics related to this stream.
- `WebTransportSendStream.getWriter()`
    Returns a new `WebTransportWriter` object and locks the stream to it. While the stream is locked, no other writer can be acquired until this one is released.

## Examples

See `WebTransport.incomingUnidirectionalStreams` for an example of how to get a `ReadableStream` of `WebTransportSendStream` objects.

## See also

- Using WebTransport
- `Streams API`
- WebTransport over HTTP/3
