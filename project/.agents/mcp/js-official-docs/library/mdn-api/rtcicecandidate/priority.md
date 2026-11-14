---
title: "RTCIceCandidate: priority property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidate/priority/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidate: priority property

The **`RTCIceCandidate`** interface's read-only **`priority`** property specifies the candidate's priority according to the remote peer; the higher this value is, the better the remote peer considers the candidate to be.

The `priority` field's value is set from the `candidateInfo` options object passed to the `RTCIceCandidate()` constructor.
You can't specify the value of `priority` directly in the options object, but its value is automatically extracted from the object's `candidate` a-line, if it's formatted properly.

## Value

A long, unsigned integer value indicating the priority of the candidate according to the remote peer.
The larger this value is, the more preferable the remote peer considers this candidate to be.

`priority` is initialized to `null` if it is not specified in the `candidate`, or if the `candidate` string can't be parsed properly.

> **Note:**
> If `priority` is `null`, passing the
> candidate to `addIceCandidate()`
> will fail, throwing an `OperationError` exception. This applies only if the
> candidate implements the `priority` property.

## Usage notes

Consider this SDP attribute line (a-line) which describes an ICE candidate:

```plain
a=candidate:4234997325 1 udp 2043278322 192.0.2.172 44323 typ host
```

The priority is the number after the protocol, so it's the fourth field in the candidate string.
In this example, the priority is 2043278322.

## Examples

This candidate examines the `priority` of the candidate and, if it's greater
than the priority of a previously-seen candidate, remembers the candidate for later use.

```js
let bestCandidate = {
  candidate: "",
  sdpMid: null,
  sdpMLineIndex: null,
  priority: 0,
};

function handleCandidate(candidateString) {
  const candidate = new RTCIceCandidate(candidateString);

  if (candidate.priority > bestCandidate.priority) {
    bestCandidate = candidate;
  }
}
```
