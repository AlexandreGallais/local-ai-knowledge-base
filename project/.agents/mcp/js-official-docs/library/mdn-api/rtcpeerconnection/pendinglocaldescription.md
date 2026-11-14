---
title: "RTCPeerConnection: pendingLocalDescription property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/pendinglocaldescription/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: pendingLocalDescription property

The **`pendingLocalDescription`** read-only property of the `RTCPeerConnection` interface returns an `RTCSessionDescription` object describing a pending configuration change for the local end of the connection.

This does not describe the connection as it currently stands, but as it may exist in the near future.
Use `RTCPeerConnection.currentLocalDescription` or `RTCPeerConnection.localDescription` to get the current state of the endpoint.
For details on the difference, see Pending and current descriptions in the WebRTC Connectivity page.

## Value

If a local description change is in progress, this is an `RTCSessionDescription` describing the proposed configuration.
Otherwise, this returns `null`.

## Examples

This example looks at the `pendingLocalDescription` to determine whether or not there's a description change being processed.

```js
const pc = new RTCPeerConnection();
// …
const sd = pc.pendingLocalDescription;
if (sd) {
  // There's a description change underway!
} else {
  // No description change pending
}
```

## Browser compatibility

> **Note:**
> The addition of `pendingLocalDescription` and `currentLocalDescription` to the WebRTC spec is relatively recent.
> In browsers which don't support them, only `localDescription` is available.

## See also

- `RTCPeerConnection.setLocalDescription()`, `RTCPeerConnection.currentLocalDescription`, `RTCPeerConnection.localDescription`
- `RTCPeerConnection.setRemoteDescription()`, `RTCPeerConnection.remoteDescription`, `RTCPeerConnection.pendingRemoteDescription`, `RTCPeerConnection.currentRemoteDescription`
- WebRTC
