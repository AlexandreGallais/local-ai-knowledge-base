---
title: "RTCPeerConnection: sctp property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/sctp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: sctp property

The **`sctp`** read-only property of the `RTCPeerConnection` interface returns an `RTCSctpTransport` describing the SCTP transport over which SCTP data is being sent and received.
If SCTP hasn't been negotiated, this value is `null`.

The SCTP transport is used for transmitting and receiving data for any and all `RTCDataChannel`s on the peer connection.

## Value

A `RTCSctpTransport` object describing the SCTP transport being used by the `RTCPeerConnection` for transmitting and receiving on its data channels, or `null` if SCTP negotiation hasn't happened.

## Example

```js
const peerConnection = new RTCPeerConnection();

const channel = peerConnection.createDataChannel("Mydata");
channel.onopen = (event) => {
  channel.send("sending a message");
};
channel.onmessage = (event) => {
  console.log(event.data);
};

// Determine the largest message size that can be sent

const sctp = peerConnection.sctp;
const maxMessageSize = sctp.maxMessageSize;
```

## See also

- WebRTC
- `RTCPeerConnection`
- `RTCDataChannel`
- SCTP
