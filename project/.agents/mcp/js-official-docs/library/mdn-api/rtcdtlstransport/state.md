---
title: "RTCDtlsTransport: state property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdtlstransport/state/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDtlsTransport: state property

The **`state`** read-only property of the
`RTCDtlsTransport` interface provides information which describes a
Datagram Transport Layer Security (**DTLS**) transport state.

## Value

A string. Its value is one of the following:

- `new`
    The initial state when DTLS has not started negotiating yet.
- `connecting`
    DTLS is in the process of negotiating a secure connection and verifying the remote fingerprint.
- `connected`
    DTLS has completed negotiation of a secure connection and verified the remote fingerprint.
- `closed`
    The transport has been closed intentionally as the result of receipt of a
    `close_notify` alert, or calling `RTCPeerConnection.close()`.
- `failed`
    The transport has failed as the result of an error (such as receipt of an error
    alert or failure to validate the remote fingerprint).

## Examples

See `RTCDtlsTransport` for example code.

## See also

- WebRTC API
- `RTCDtlsTransport`
