---
title: "RTCDataChannel: readyState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannel/readystate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannel: readyState property

The read-only `RTCDataChannel` property **`readyState`** returns a string which indicates the state of the data channel's underlying data connection.

## Values

A string indicating the current state of the underlying data transport, which is one of the following values:

- `connecting`
    The user agent (browser) is in the process of creating the underlying data transport;
    this is the state of a new `RTCDataChannel` after being created by `RTCPeerConnection.createDataChannel()`,
    on the peer which started the connection process.
- `open`
    The underlying data transport has been established
    and data can be transferred bidirectionally across it.
    This is the default state of a new `RTCDataChannel` created by the WebRTC layer
    when the remote peer created the channel
    and delivered it to the site or app
    in a `datachannel` event.
- `closing`
    The process of closing the underlying data transport has begun.
    It is no longer possible to queue new messages to be sent,
    but previously queued messages may still be send or received
    before entering the `closed` state.
- `closed`
    The underlying data transport has closed,
    or the attempt to make the connection failed.

## Example

```js
const dataChannel = peerConnection.createDataChannel("File Transfer");
const sendQueue = [];

function sendMessage(msg) {
  switch (dataChannel.readyState) {
    case "connecting":
      console.log(`Connection not open; queueing: ${msg}`);
      sendQueue.push(msg);
      break;
    case "open":
      sendQueue.forEach((msg) => dataChannel.send(msg));
      break;
    case "closing":
      console.log(`Attempted to send message while closing: ${msg}`);
      break;
    case "closed":
      console.log("Error! Attempt to send while connection closed.");
      break;
  }
}
```

## See also

- WebRTC
- Using WebRTC data channels
- `RTCDataChannel`
- `RTCPeerConnection.createDataChannel()`
