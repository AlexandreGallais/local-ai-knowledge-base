---
title: "RTCPeerConnectionIceEvent: url property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnectioniceevent/url/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnectionIceEvent: url property

The read-only **`url`** property of the `RTCPeerConnectionIceEvent` interface returns the URL of the STUN or TURN server used to gather the ICE candidate that caused the event. If the candidate was not gathered from a STUN or TURN server, the value is `null`.

> **Note:**
> This property is considered deprecated by the specification in favor of the `url` property on the `RTCIceCandidate` interface itself.

## Value

A string containing the URL of the STUN or TURN server used to gather this candidate, or `null` if the candidate was not gathered from a server (for example, a local host candidate).

## Examples

### Logging the ICE server URL

```js
pc.onicecandidate = (event) => {
  if (event.candidate) {
    console.log(`Candidate gathered from: ${event.url}`);
  }
};
```

## See also

- `icecandidate`
- `RTCPeerConnectionIceEvent.candidate`
- `RTCPeerConnection`
