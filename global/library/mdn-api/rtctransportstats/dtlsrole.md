---
title: "RTCTransportStats: dtlsRole property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtctransportstats/dtlsrole/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCTransportStats: dtlsRole property

The **`dtlsRole`** property of the `RTCTransportStats` dictionary is a string that indicates the role of the associated `RTCPeerConnection` in the DTLS negotiation.

Specifically, whether it acted like a server and listened for connections, or like a client and initiated the connection, or that negotiation has not yet started.

## Value

A string indicating the DTLS role.
This will be one of:

- `client`
    The peer initiated the DTLS handshake.
- `server`
    The peer waited for the DTLS handshake.
- `unknown`
    DTLS negotiation has not started.
