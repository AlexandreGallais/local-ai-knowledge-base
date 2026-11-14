---
title: "RTCIceTransport: getRemoteParameters() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicetransport/getremoteparameters/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceTransport: getRemoteParameters() method

The **`getRemoteParameters()`** method of the `RTCIceTransport` interface returns an `RTCIceParameters` object that provides information uniquely identifying the remote peer for the duration of the ICE session.

The remote peer's parameters are received during ICE signaling and delivered to the transport when the client calls `RTCPeerConnection.setRemoteDescription()`.

## Syntax

```js
getRemoteParameters()
```

### Parameters

None.

### Return value

An `RTCIceParameters` object indicating the `usernameFragment` and `password` which uniquely identify the remote peer for the duration of the ICE session.

Returns `null` if the parameters haven't been received yet.
