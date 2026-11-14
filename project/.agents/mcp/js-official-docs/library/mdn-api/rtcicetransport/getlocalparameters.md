---
title: "RTCIceTransport: getLocalParameters() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicetransport/getlocalparameters/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceTransport: getLocalParameters() method

The **`getLocalParameters()`** method of the `RTCIceTransport` interface returns an `RTCIceParameters` object that provides information uniquely identifying the local peer for the duration of the ICE session.

The local peer's parameters are obtained during ICE signaling and delivered to the transport when the client calls `RTCPeerConnection.setLocalDescription()`.

## Syntax

```js
getLocalParameters()
```

### Parameters

None.

### Return value

An `RTCIceParameters` object indicating the `usernameFragment` and `password` which uniquely identify the local peer for the duration of the ICE session.

Returns `null` if the parameters have not yet been received.
