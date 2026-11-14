---
title: "RTCError: sentAlert property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcerror/sentalert/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCError: sentAlert property

The **`sentAlert`** read-only property of the `RTCError` interface specifies the DTLS alert number sent to the remote peer, if the error represents an outbound DTLS error.

## Value

A positive integer value providing the DTLS alert number corresponding to the DTLS error which was sent to the remote peer, as represented by this `RTCError` object.
This property is `null` if `errorDetail` isn't `dtls-failure`.
