---
title: "RTCDataChannel: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannel/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannel: close() method

The **`RTCDataChannel.close()`** method closes the
`RTCDataChannel`. Either peer is permitted to call this method to initiate
closure of the channel.

Closure of the data channel is not instantaneous. Most of the process of closing the
connection is handled asynchronously; you can detect when the channel has finished
closing by watching for a `close` event on the data channel.

The sequence of events which occurs in response to this method being called:

1. `RTCDataChannel.readyState` is set to `closing`.
2. A background task is established to handle the remainder of the steps below, and
   `close()` returns to the caller.
3. The transport layer deals with any buffered messages; the protocol layer decides
   whether to send them or discard them.
4. The underlying data transport is closed.
5. The `RTCDataChannel.readyState` property is set to
   `closed`.
6. If the transport was closed with an error,
   the `RTCDataChannel` is sent
   an `error` event
   with its `name` set to `NetworkError`.
7. A `close` event is sent to the channel.

## Syntax

```js
close()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
const pc = new RTCPeerConnection();
const dc = pc.createDataChannel("my channel");

dc.onmessage = (event) => {
  console.log(`received: ${event.data}`);
  dc.close(); // We decided to close after the first received message
};

dc.onopen = () => {
  console.log("datachannel open");
};

dc.onclose = () => {
  console.log("datachannel close");
};

// Now negotiate the connection and so forth…
```

## See also

- WebRTC
- `RTCDataChannel`
- `RTCDataChannel.readyState`
- `close` event
