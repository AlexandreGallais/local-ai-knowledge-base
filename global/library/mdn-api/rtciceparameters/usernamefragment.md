---
title: "RTCIceParameters: usernameFragment property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtciceparameters/usernamefragment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceParameters: usernameFragment property

The **`RTCIceParameters`** dictionary's
**`usernameFragment`** property specifies the username fragment
("ufrag") that uniquely identifies the corresponding ICE session for the duration of the
current ICE session.

## Value

A string containing the username fragment that, in tandem with the
`password`, uniquely identify the ICE session
being used by the transport. The string may be up to 256 characters long.

See `RTCIceCandidate.usernameFragment` to learn more about username
fragments and their role in a connection.
