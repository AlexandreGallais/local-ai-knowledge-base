---
title: "RTCIceParameters"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtciceparameters/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceParameters

The **`RTCIceParameters`** dictionary specifies the username fragment and password <example-value> to an ICE session.

During ICE negotiation, each peer's username fragment and password are recorded in an `RTCIceParameters` object, which can be obtained from the `RTCIceTransport` by calling its `getLocalParameters()` or `getRemoteParameters()` method, depending on which end interests you.

## Instance properties

- `usernameFragment`
    A string specifying the value of the ICE session's username fragment field, `ufrag`.
- `password`
    A string specifying the session's password string.

## Usage notes

The username fragment and password <example-value> identify the remote peer for the duration of the ICE session, and are used to both ensure security and to avoid crosstalk across multiple ongoing ICE sessions. See `RTCIceCandidate.usernameFragment` for further information.
