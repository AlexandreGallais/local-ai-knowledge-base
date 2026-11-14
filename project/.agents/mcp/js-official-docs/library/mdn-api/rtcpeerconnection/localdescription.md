---
title: "RTCPeerConnection: localDescription property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/localdescription/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: localDescription property

The **`localDescription`** read-only property of the `RTCPeerConnection` interface returns an `RTCSessionDescription` describing the session for the local end of the connection.
If it has not yet been set, this is `null`.

## Value

On a more fundamental level, the returned value is the value of `RTCPeerConnection.pendingLocalDescription` if that property isn't `null`;
otherwise, the value of `RTCPeerConnection.currentLocalDescription` is returned.
See Pending and current descriptions in the WebRTC Connectivity page for details on this algorithm and why it's used.

## Example

This example looks at the `localDescription` and displays an alert containing the `RTCSessionDescription` object's `type` and `sdp` fields.

```js
const pc = new RTCPeerConnection();
// …
const sd = pc.localDescription;
if (sd) {
  alert(`Local session: type='${sd.type}'; sdp description='${sd.sdp}'`);
} else {
  alert("No local session yet.");
}
```

## See also

- `RTCPeerConnection.setLocalDescription()`, `RTCPeerConnection.pendingLocalDescription`, `RTCPeerConnection.currentLocalDescription`
- `RTCPeerConnection.setRemoteDescription()`, `RTCPeerConnection.remoteDescription`, `RTCPeerConnection.pendingRemoteDescription`, `RTCPeerConnection.currentRemoteDescription`
- WebRTC
