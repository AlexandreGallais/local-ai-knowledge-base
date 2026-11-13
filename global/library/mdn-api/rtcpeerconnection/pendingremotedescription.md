---
title: "RTCPeerConnection: pendingRemoteDescription property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/pendingremotedescription/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: pendingRemoteDescription property

The **`pendingRemoteDescription`** read-only property of the `RTCPeerConnection` interface returns an `RTCSessionDescription` object describing a pending configuration change for the remote end of the connection.

This does not describe the connection as it currently stands, but as it may exist in the near future.
Use `RTCPeerConnection.currentRemoteDescription` or `RTCPeerConnection.remoteDescription` to get the current session
description for the remote endpoint.
For details on the difference, see Pending and current descriptions in the WebRTC Connectivity page.

## Value

If a remote description change is in progress, this is an `RTCSessionDescription` describing the proposed configuration.
Otherwise, this returns `null`.

## Examples

This example looks at the `pendingRemoteDescription` to determine whether or not there's a description change being processed.

```js
const pc = new RTCPeerConnection();
// …
const sd = pc.pendingRemoteDescription;
if (sd) {
  // There's a description change underway!
} else {
  // No description change pending
}
```

## Browser compatibility

> **Note:**
> The addition of `pendingRemoteDescription` and `currentRemoteDescription` to the WebRTC spec is relatively recent.
> In browsers which don't support them, only `remoteDescription` is available.

## See also

- `RTCPeerConnection.setRemoteDescription()`,
  `RTCPeerConnection.currentRemoteDescription`,
  `RTCPeerConnection.remoteDescription`
- `RTCPeerConnection.setLocalDescription()`,
  `RTCPeerConnection.localDescription`,
  `RTCPeerConnection.pendingLocalDescription`,
  `RTCPeerConnection.currentLocalDescription`
- WebRTC
