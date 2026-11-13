---
title: "RTCSessionDescription: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcsessiondescription/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCSessionDescription: type property

The property **`RTCSessionDescription.type`** is a read-only
string value which describes the description's type.

## Value

The possible values are:

- `"answer"`
    The SDP contained in the `sdp` property is the definitive choice in the exchange. In other words, this session description describes the agreed-upon configuration, and is being sent to finalize negotiation.
- `"offer"`
    The session description object describes the initial proposal in an offer/answer exchange. The session negotiation process begins with an offer being sent from the caller to the callee.
- `"pranswer"`
    The session description object describes a provisional answer; that is, a response to a previous offer that is not the final answer. It is usually employed by legacy hardware.
- `"rollback"`
    This special type with an empty session description is used to roll back to the previous stable state.

## Example

```js
// The remote description has been set previously on pc, a RTCPeerConnection

alert(pc.remoteDescription.type);
```

## See also

- WebRTC
