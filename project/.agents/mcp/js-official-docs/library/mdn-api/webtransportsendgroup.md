---
title: "WebTransportSendGroup"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportsendgroup/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportSendGroup

The **`WebTransportSendGroup`** interface of the `WebTransport API` represents a group of streams and datagrams, within which relative send priority is determined by the `sendOrder` value of each member.

`WebTransportSendGroup` is a transferable object.

## Instance methods

- `getStats()`
    Returns a `Promise` that resolves with an object containing statistics aggregated across all of the `WebTransportSendStream` and `WebTransportDatagramsWritable` objects currently associated with this group.

## Description

Unlike for `WritableStream` instances, for which the priority at which bytes are sent on different streams is implementation-dependent, a `WebTransportDatagramsWritable` or `WebTransportSendStream` allows you to set the priority at which bytes will be sent on each instance relative to others in the same `sendGroup`.
A send group is created using the `createSendGroup()` method, and the relative priority is defined by the `sendOrder` property of `WebTransportDatagramsWritable` or `WebTransportSendStream` instances.
Different groups are expected to be treated as equals for the purposes of bandwidth allocation — though the precise way bandwidth is divided between groups is implementation-defined.

A `WebTransportSendGroup` is created using the `createSendGroup()` method of the `WebTransport` interface.
You can then associate it with a `WebTransportDatagramsWritable` or `WebTransportSendStream` by:

- Passing it as the `sendGroup` option when the object is created — see `WebTransport.createUnidirectionalStream()`, `WebTransport.createBidirectionalStream()`, and `WebTransportDatagramDuplexStream.createWritable()`.
- Setting the object's `sendGroup` property afterwards — see `WebTransportSendStream.sendGroup` and `WebTransportDatagramsWritable.sendGroup`.

## Examples

### Basic usage

The example below creates a send group, then associates a unidirectional stream and the connection's outgoing datagram stream with it, giving each a `sendOrder`.
Bytes on the datagram stream will be prioritized ahead of any bytes on the unidirectional stream, because they are both in the same `sendGroup` and the datagram stream has a higher `sendOrder`.

```js
const sendGroup = transport.createSendGroup();

const stream = await transport.createUnidirectionalStream({
  sendGroup,
  sendOrder: 1,
});

const datagrams = transport.datagrams.createWritable({
  sendGroup,
  sendOrder: 2,
});
```

## See also

- Using WebTransport
- `Streams API`
