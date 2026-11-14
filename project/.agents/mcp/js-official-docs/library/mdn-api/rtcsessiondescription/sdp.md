---
title: "RTCSessionDescription: sdp property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcsessiondescription/sdp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCSessionDescription: sdp property

The property **`RTCSessionDescription.sdp`** is a read-only
string containing the SDP which describes the session.

## Value

The value is a string containing an SDP message like this one:

```plain
v=0
o=alice 2890844526 2890844526 IN IP4 host.anywhere.com
s=
c=IN IP4 host.anywhere.com
t=0 0
m=audio 49170 RTP/AVP 0
a=rtpmap:0 PCMU/8000
m=video 51372 RTP/AVP 31
a=rtpmap:31 H261/90000
m=video 53000 RTP/AVP 32
a=rtpmap:32 MPV/90000
```

## Example

```js
// The remote description has been set previously on pc, an RTCPeerConnection

alert(pc.remoteDescription.sdp);
```

## See also

- WebRTC
- The standard for using SDP in an offer/answer protocol 3264.
