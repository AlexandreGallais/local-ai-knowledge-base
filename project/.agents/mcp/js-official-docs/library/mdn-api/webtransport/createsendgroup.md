---
title: "WebTransport: createSendGroup() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransport/createsendgroup/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransport: createSendGroup() method

The **`createSendGroup()`** method of the `WebTransport` interface creates and returns a `WebTransportSendGroup`.

## Syntax

```js
createSendGroup()
```

### Parameters

None.

### Return value

A `WebTransportSendGroup` object.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the transport's state is `"closed"` or `"failed"`.

## Description

The **`createSendGroup()`** method creates a new `WebTransportSendGroup` associated with the `WebTransport` object on which it is called.

The `WebTransportSendGroup` object is used to group streams and/or datagrams created on the same `WebTransport`, to control their relative priority for sending queued bytes.
Within the same group, bytes on higher-priority streams and datagrams are sent before bytes from lower-priority ones.

The returned `WebTransportSendGroup` is not initially associated with any streams or datagrams.
You can associate it with a `WebTransportDatagramsWritable` or `WebTransportSendStream` object in a couple of different ways:

- By passing it as the `sendGroup` option when the object is created — see `WebTransport.createUnidirectionalStream()`, `WebTransport.createBidirectionalStream()`, and `WebTransportDatagramDuplexStream.createWritable()`.
- By setting the object's `sendGroup` property afterwards — see `WebTransportSendStream.sendGroup` and `WebTransportDatagramsWritable.sendGroup`.

Different groups are expected to be treated as equals for the purposes of bandwidth allocation — though the precise way bandwidth is divided between groups is implementation-defined.

## Examples

### Basic usage

This example creates a send group, then associates a unidirectional stream and the connection's outgoing datagram stream with it, giving each a `sendOrder` that defines their relative priority.

```js
const sendGroup = transport.createSendGroup();

const stream = await transport.createUnidirectionalStream({
  sendGroup,
  sendOrder: 1,
});

// Higher sendOrder: queued bytes on this stream are sent first
const datagrams = transport.datagrams.createWritable({
  sendGroup,
  sendOrder: 2,
});
```

## See also

- Using WebTransport
- `Streams API`
