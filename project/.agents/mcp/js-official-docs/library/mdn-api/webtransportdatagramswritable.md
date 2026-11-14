---
title: "WebTransportDatagramsWritable"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportdatagramswritable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportDatagramsWritable

The **`WebTransportDatagramsWritable`** interface of the `WebTransport API` is a specialized `WritableStream` that can be used to write outgoing datagrams to a `WebTransport` connection.

`WebTransportDatagramsWritable` is a transferable object.

## Instance properties

_Also inherits properties from its parent interface, `WritableStream`._

- `WebTransportDatagramsWritable.sendGroup`
    Gets or sets a `WebTransportSendGroup` that the stream's datagrams are grouped under for the purposes of `sendOrder` prioritization.
- `WebTransportDatagramsWritable.sendOrder`
    Gets or sets an integer indicating the priority of this stream relative to other streams and datagrams in the same `sendGroup`.

## Instance methods

_Inherits methods from its parent interface, `WritableStream`._

## Description

In addition to the functionality of a standard `WritableStream`, the `WebTransportDatagramsWritable` interface provides the `sendGroup` property that indicates the group of streams and datagrams that this stream belongs to, and the `sendOrder` property that indicates the relative priority of this stream within that group.
Within a group, bytes queued on higher-priority streams and datagrams are sent before any bytes from lower-priority ones.
Different groups are expected to be treated as equals for the purposes of bandwidth allocation — though the precise way bandwidth is divided between groups is implementation-defined.

Objects of this type are not constructed directly.
Instead, an instance is returned by the `createWritable()` method of `WebTransportDatagramDuplexStream`, which can be accessed using the `WebTransport.datagrams` property.

The transmission is unreliable, meaning that even though you can define the priority order, there is no guarantee that every datagram will be sent, or that they will arrive in any particular order.

## Examples

See `createWritable()` for an example showing how to create a `WebTransportDatagramsWritable` and use it to write outgoing datagrams.

## See also

- `Streams API`
- Using WebTransport
