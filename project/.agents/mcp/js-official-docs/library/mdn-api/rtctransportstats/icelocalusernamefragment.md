---
title: "RTCTransportStats: iceLocalUsernameFragment property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtctransportstats/icelocalusernamefragment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCTransportStats: iceLocalUsernameFragment property

The **`iceLocalUsernameFragment`** property of the `RTCTransportStats` dictionary is a string that indicates the local username fragment ("ufrag" or "ice-ufrag") that uniquely identifies the ICE interaction session managed by this transport.

The same username fragment is used to identify the session for any communication with the STUN server.

This has the same values as the corresponding local `RTCIceCandidate.usernameFragment` property.
It will change if the connection is renegotiated, for example on ICE restart, or if `RTCPeerConnection.setLocalDescription()` is called.

## Value

A string containing the username fragment that uniquely identifies the ongoing ICE session on the transport.

The string may be up to 256 characters long, and has no default value.
