---
title: "RTCPeerConnectionIceEvent: candidate property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnectioniceevent/candidate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnectionIceEvent: candidate property

The read-only **`candidate`** property
of the `RTCPeerConnectionIceEvent` interface returns the
`RTCIceCandidate` associated with the event.

## Value

An `RTCIceCandidate` object representing the ICE candidate that has been
received, or `null` to indicate that there are no further candidates for this
negotiation session.

## Example

```js
pc.onicecandidate = (ev) => {
  alert(
    `The ICE candidate (transport address: '${ev.candidate.candidate}') has been added to this connection.`,
  );
};
```

## See also

- `icecandidate`
- `RTCPeerConnection`
