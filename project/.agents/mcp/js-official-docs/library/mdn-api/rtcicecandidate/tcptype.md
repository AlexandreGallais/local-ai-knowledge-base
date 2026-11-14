---
title: "RTCIceCandidate: tcpType property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidate/tcptype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidate: tcpType property

The **`RTCIceCandidate`** interface's read-only **`tcpType`** property is included on TCP candidates to provide additional details about the candidate type.

The `tcpType` field's value is set from the `candidateInfo` options object passed to the `RTCIceCandidate()` constructor.
You can't specify the value of `tcpType` directly in the options object, but its value is automatically extracted from the object's `candidate` a-line, if it's formatted properly.

## Value

If the `protocol` is "tcp", `tcpType` has one of the following values:

- `"active"`
    The transport will try to open an outbound connection but won't receive incoming connection requests.
- `"passive"`
    The transport will receive incoming connection requests but won't try to open an outbound connection.
- `"so"`
    The transport will try to open a connection simultaneously with its peer.

`tcpType` is `null` for UDP candidates.

## Examples

In this example, the candidate's `protocol`
and `tcpType` are used to adjust the user interface for simultaneous-open TCP candidates.

```js
if (candidate.protocol === "tcp" && candidate.tcpType === "so") {
  adjustForSimultaneousOpen(candidate);
}
```

## See also

- WebRTC API
- Introduction to WebRTC protocols
- WebRTC connectivity
- `RTCIceCandidate.protocol`
- `RTCIceCandidate.type`
