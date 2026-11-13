---
title: "RTCIceCandidate: protocol property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidate/protocol/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidate: protocol property

The **`RTCIceCandidate`** interface's read-only **`protocol`** property is a string
which indicates whether the candidate uses UDP or TCP as its transport protocol.

The `protocol` field's value is set from the `candidateInfo` options object passed to the `RTCIceCandidate()` constructor.
You can't specify the value of `protocol` directly in the options object, but its value is automatically extracted from the object's `candidate` a-line, if it's formatted properly.

`protocol` is `null` by default if not specified properly in the SDP, but this is an error condition and will result in a thrown exception when you call `RTCPeerConnection.addIceCandidate()`.

## Value

A string that indicates what network protocol the candidate uses:

- `tcp`
    The candidate, if selected, would use TCP as the transport protocol for its data. The `tcpType` property provides additional information about the kind of TCP candidate represented by the object.
- `udp`
    The candidate will use the UDP transport protocol for its data. This is the preferred protocol for media interactions because of its better performance profile.

> **Note:**
> If `protocol` is `null` — and `protocol` is supported by the user agent — passing the
> candidate to `addIceCandidate()` will fail, throwing an `OperationError` exception.

## Usage notes

Here's an example candidate a-line from an ICE transaction:

```plain
a=candidate:4234997325 1 udp 2043278322 192.0.2.172 44323 typ host
```

The third field, `"udp"`, is the protocol type, indicating that the
candidate would use the UDP transport protocol.

## Examples

This code snippet examines the value of `protocol` to decide if it should
look at the value of `tcpType` to see if it's a
**simultaneous-open** (**S-O**) candidate.

```js
if (candidate.protocol === "tcp") {
  if (candidate.tcpType === "so") {
    adjustForSimultaneousOpen(candidate);
  }
}
```
