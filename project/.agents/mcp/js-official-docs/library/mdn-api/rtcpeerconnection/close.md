---
title: "RTCPeerConnection: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: close() method

The **`close()`** method of the `RTCPeerConnection` interface closes the current peer connection.

Calling this method terminates the `RTCPeerConnection`'s ICE agent, ending any ongoing ICE processing and any active streams.
This also releases any resources in use by the ICE agent, including TURN permissions.
All `RTCRtpSender` objects are considered to be stopped once this returns (they may still be in the process of stopping, but for all intents and purposes, they're stopped).

Once this method returns, the signaling state as returned by `RTCPeerConnection.signalingState` is `closed`.

Make sure that you `delete` all references to the previous `RTCPeerConnection` before attempting to create a new one that connects to the same remote peer, as not doing so might result in some errors depending on the browser.

## Syntax

```js
close()
```

### Parameters

None.

### Return value

None (`undefined`).

## Example

```js
const pc = new RTCPeerConnection();
const dc = pc.createDataChannel("my channel");

dc.onmessage = (event) => {
  console.log(`received: ${event.data}`);
  pc.close(); // We decided to close after the first received message
};

dc.onopen = () => {
  console.log("datachannel open");
};

dc.onclose = () => {
  console.log("datachannel close");
};
```

## See also

- WebRTC
- `RTCPeerConnection`
- `RTCPeerConnection.signalingState`
