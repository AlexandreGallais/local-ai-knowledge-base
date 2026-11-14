---
title: "RTCPeerConnection: remoteDescription property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/remotedescription/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: remoteDescription property

The **`remoteDescription`** read-only property of the `RTCPeerConnection` interface returns a `RTCSessionDescription` describing the session (which includes configuration and media information) for the remote end of the connection.
If this hasn't been set yet, this is `null`.

The returned value typically reflects a remote description which has been received over the signaling server (as either an offer or an answer) and then put into effect by your code calling `RTCPeerConnection.setRemoteDescription()` in response.

## Value

On a more fundamental level, the returned value is the value of `RTCPeerConnection.pendingRemoteDescription` if that property isn't
`null`;
otherwise, the value of `RTCPeerConnection.currentRemoteDescription` is returned.
See Pending and current descriptions in the WebRTC Connectivity page for details on this algorithm and why it's used.

## Example

This example looks at the `remoteDescription` and displays an alert containing the `RTCSessionDescription` object's `type` and `sdp` fields.

```js
const pc = new RTCPeerConnection();
// …
const sd = pc.remoteDescription;
if (sd) {
  alert(`Remote session: type='${sd.type}'; sdp description='${sd.sdp}'`);
} else {
  alert("No remote session yet.");
}
```

## See also

- `RTCPeerConnection.setRemoteDescription()`, `RTCPeerConnection.pendingRemoteDescription`, `RTCPeerConnection.currentRemoteDescription`
- `RTCPeerConnection.setLocalDescription()`, `RTCPeerConnection.pendingLocalDescription`, `RTCPeerConnection.currentLocalDescription`, `RTCPeerConnection.localDescription`
- WebRTC
