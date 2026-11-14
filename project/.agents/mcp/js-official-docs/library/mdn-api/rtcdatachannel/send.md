---
title: "RTCDataChannel: send() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannel/send/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannel: send() method

The **`send()`** method of the
`RTCDataChannel` interface sends data across the data channel to the
remote peer.
This can be done any time except during the initial process of
creating the underlying transport channel. Data sent before connecting is buffered if
possible (or an error occurs if it's not possible), and is also buffered if sent while
the connection is closing or closed.

> **Note:**
> Different browsers have different limitations on the size of the message you can
> send. Specifications exist to define how to automatically fragment large messages, but
> not all browsers implement them, and those that do have various additional
> restrictions. This will get less complicated over time, but for now, if you have
> questions, see Understanding message size limits.

## Syntax

```js
send(data)
```

### Parameters

- `data`
    The data to transmit across the connection. This may be a string,
    a `Blob`, an `ArrayBuffer`, a `TypedArray` or a `DataView` object.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown when the data channel has not finished establishing its own connection (that is, its
    `readyState` is `connecting`). The data channel
    must establish its own connection because it uses a transport channel separate from that of the media content. This error occurs without sending or buffering the `data`.
- `OperationError` `DOMException`
    Thrown when the specified `data` would need to be buffered, and there isn't room for it in the buffer.
- `TypeError`
    Thrown if the specified `data` is too large for the other peer to receive. Since
    there are multiple techniques for breaking up large data into smaller pieces for
    transfer, it's possible to encounter scenarios in which the other peer does not
    support the same ones. For example, if one peer is a modern browser that supports
    using the `EOR` (End of Record) flag to indicate when a received message is
    the last piece of a multi-part object sent using `send()`. For more
    information about message size restrictions, see
    Understanding message size limits.

## Examples

In this example, a routine called `sendMessage()` is created; it accepts an
object as input and sends to the remote peer, over the `RTCDataChannel`, a
JSON string with the specified object and a timestamp.

```js
const pc = new RTCPeerConnection();
const dc = pc.createDataChannel("BackChannel");

function sendMessage(msg) {
  const obj = {
    message: msg,
    timestamp: new Date(),
  };
  dc.send(JSON.stringify(obj));
}
```

## See also

- WebRTC
- `RTCDataChannel`
- `RTCDataChannel.readyState`
- `close` event
