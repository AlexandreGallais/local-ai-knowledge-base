---
title: "WebTransportSendStream: sendGroup property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportsendstream/sendgroup/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportSendStream: sendGroup property

The **`sendGroup`** property of the `WebTransportSendStream` interface represents the `WebTransportSendGroup` that this stream is grouped under for the purposes of `sendOrder` prioritization.

Within a group, bytes queued for sending on streams and datagrams with a higher `sendOrder` are sent before any bytes from lower-priority ones.
Different groups are expected to be treated as equals for the purposes of bandwidth allocation — though the precise way bandwidth is divided between groups is implementation-defined.

## Value

A `WebTransportSendGroup` object, or `null` to specify the default send group.
The default value is `null`.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if set to a `WebTransportSendGroup` that is associated with a different `WebTransport` object than this stream.

## Examples

### Basic usage

The example below creates a send group using the `WebTransport.createSendGroup()` method, and then uses it with a `sendOrder` value, to prioritize the stream relative to other streams and datagrams that are part of the same group:

```js
const sendGroup = transport.createSendGroup();

const stream = await transport.createUnidirectionalStream({
  sendGroup,
  sendOrder: 1,
});

console.log(stream.sendGroup === sendGroup); // true
```

## See also

- `WebTransportSendGroup`
- `WebTransportSendStream.sendOrder`
- `Streams API`
- Using WebTransport
